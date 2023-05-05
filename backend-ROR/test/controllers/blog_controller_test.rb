require "test_helper"

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


end
