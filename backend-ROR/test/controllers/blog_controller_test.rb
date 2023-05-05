require "test_helper"
require_relative '../../lib/json_web_token'

class BlogControllerTest < ActionDispatch::IntegrationTest


  def setup
    @userxt = users(:xtone)
    @userxt_token = JsonWebToken.encode('user_id': @userxt.id)
    @Auth_userxt = {'Authorization' => "Bearer #{@userxt_token}"}
    @blogxt = blogs(:xtone)
  end 

  test "should get all blogs" do
    get blog_url, headers: @Auth_userxt, as: :json
    assert_response :success
  end

  test "shoud be able to update viewcount" do
    put user_blog_viewcount_url(@userxt.id, @blogxt.id), headers: @Auth_userxt, as: :json
    @blog = Blog.where(id: @blogxt.id).first
    assert_equal @blog.view_count, 4
    assert_response :success
  end

  test "shoud not be able to update view count, if blog is not found" do
    put user_blog_viewcount_url(@userxt.id, 22), headers: @Auth_userxt, as: :json
    assert_response :unprocessable_entity
  end

  test "user should be able to update blog" do
    put user_blog_url(@userxt.id, @blogxt.id), headers: @Auth_userxt, params: {title: 'change title', content: 'Auth_userxt content 123'} ,as: :json
    blog = Blog.find(@blogxt.id)
    assert_equal blog.title, 'change title'
    assert_equal blog.content, 'Auth_userxt content 123'
    assert_response :success
  end

  test "user should not be able to update blog if title or content is missing" do
    put user_blog_url(@userxt.id, @blogxt.id), headers: @Auth_userxt, params: {title: ""} ,as: :json
    assert_response :unprocessable_entity
  end

  test "user should not be able to update view count" do
    put user_blog_url(@userxt.id, @blogxt.id), headers: @Auth_userxt, params: { view_count: "5"} ,as: :json
    blog = Blog.find(@blogxt.id)
    assert_not_equal blog.view_count , 5
    assert_response :success
  end

  test "user should not be able to update with a improper blog id" do
    put user_blog_url(@userxt.id, 123), headers: @Auth_userxt ,as: :json
    assert_response :unprocessable_entity
  end

  test "should get index" do
    user = users(:jt_one)
    token = JsonWebToken.encode(user_id: user.id)
    get "/user/#{user.id}/blog", headers: {Authorization: "Bearer #{token}"}, as: :json
    assert_response :success
  end

  test "should get index but failed because of wrong id" do
    user = users(:jt_one)
    token = JsonWebToken.encode(user_id: user.id)
    get "/user/1/blog", headers: {Authorization: "Bearer #{token}"}, as: :json
    assert_response :unauthorized
  end


  test "should get show" do
    user = users(:dustynb1).id
    token = JsonWebToken.encode(user_id: user)
    blog = blogs(:dustynblog1).id
    get user_blog_url(user, blog), headers: { Authorization: "Bearer #{token}" }, as: :json
    assert_response :success
  end


  test "should create" do
    user = users(:dustynb1).id
    token = JsonWebToken.encode(user_id: user)
    assert_difference 'Blog.count', 1 do
      post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...'}, 
      headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :created
    end
  end

  test "should not create with invalid input" do
    user = users(:dustynb1).id
    token = JsonWebToken.encode(user_id: user)
    assert_no_difference 'Blog.count' do
      post "/user/#{user}/blog", params: { title: '', content: 'Test blog content...'}, 
      headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :unprocessable_entity
    end
  end

  test "should not create if token invalid" do
    user = users(:dustynb1).id
    assert_no_difference 'Blog.count' do
      post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...'}, 
      headers: { Authorization: "Bearer #{}" }, as: :json
      assert_response :unauthorized
    end
  end

  test "should destroy" do
    user = users(:dustynb1).id
    blog = blogs(:dustynblog1).id
    token = JsonWebToken.encode(user_id: user)
    assert_difference 'Blog.count', -1 do
      delete "/user/#{user}/blog/#{blog}", headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :ok
    end
  end

  test "should not destroy if unowned" do
    user = users(:dustynb1).id
    blog = blogs(:dustynblog2).id
    token = JsonWebToken.encode(user_id: user)
    assert_no_difference 'Blog.count' do
      delete "/user/#{user}/blog/#{blog}", headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :unauthorized
    end
  end


end
