require "test_helper"
require_relative '../../lib/json_web_token'

class BlogControllerTest < ActionDispatch::IntegrationTest

  def setup
    @userxt = users(:xtone)
    @userxt_token = JsonWebToken.encode('user_id': @userxt.id)
    @Auth_userxt = {'Authorization' => "Bearer #{@userxt_token}"}
    @blogxt = blogs(:xtone)
  end 

  test "user should be able to update blog" do
    put user_blog_url(@userxt.id, @blogxt.id), headers: @Auth_userxt, params: {title: 'change title', content: 'Auth_userxt content 123'} ,as: :json
    assert_response :success
  end

<<<<<<< HEAD
  # test "should create" do
  #   user = users(:dustynb1).id
  #   # token = testUser
  #   assert_difference 'Blog.count', 1 do
  #     post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...',
  #                                     view_count: 10, user_id: user }, headers: { Authorization: "Bearer #{}" }, as: :json
  #     assert_response :created
  #   end
  # end

  # test "should not create with invalid input" do
  #   user = users(:dustynb1).id
  #   # token = testUser
  #   assert_no_difference 'Blog.count' do
  #     post "/user/#{user}/blog", params: { title: '', content: 'Test blog content...',
  #                                          view_count: 10, user_id: user }, headers: { Authorization: "Bearer #{}" }, as: :json
  #     assert_response :unprocessable_entity
  #   end
  # end

=======
  test "should create" do
    user = users(:dustynb1).id
    token = JsonWebToken.encode(user_id: user)
    assert_difference 'Blog.count', 1 do
      post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...',
                                      view_count: 10 }, headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :created
    end
  end

  test "should not create with invalid input" do
    user = users(:dustynb1).id
    token = JsonWebToken.encode(user_id: user)
    assert_no_difference 'Blog.count' do
      post "/user/#{user}/blog", params: { title: '', content: 'Test blog content...',
                                           view_count: 10 }, headers: { Authorization: "Bearer #{token}" }, as: :json
      assert_response :unprocessable_entity
    end
  end

  # test "should create if token invalid" do # ADD ERROR HANDLING IN JSONWebToken BEFORE UNCOMMENTING
  #   user = users(:dustynb1).id
  #   assert_difference 'Blog.count', 1 do
  #     post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...',
  #                                          view_count: 10 }, headers: { Authorization: "Bearer #{}" }, as: :json
  #     assert_response :created
  #   end
  # end

  test "should get update" do
    get blog_update_url
    assert_response :success
  end
>>>>>>> d5b4dddb01d1ed3e8ba15d753306e4ec9f866f17

end
