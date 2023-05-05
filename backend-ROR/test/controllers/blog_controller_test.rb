require "test_helper"

class BlogControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get blog_index_url
    assert_response :success
  end

  test "should get show" do
    get blog_show_url
    assert_response :success
  end

  test "should create" do
    user = users(:dustynb1).id
    # token = testUser
    assert_difference 'Blog.count', 1 do
      post "/user/#{user}/blog", params: { title: 'Test blog', content: 'Test blog content...',
                                      view_count: 10, user_id: user }, headers: { Authorization: "Bearer #{}" }, as: :json
      assert_response :created
    end
  end

  test "should not create with invalid input" do
    user = users(:dustynb1).id
    # token = testUser
    assert_no_difference 'Blog.count' do
      post "/user/#{user}/blog", params: { title: '', content: 'Test blog content...',
                                           view_count: 10, user_id: user }, headers: { Authorization: "Bearer #{}" }, as: :json
      assert_response :unprocessable_entity
    end
  end

  test "should get update" do
    get blog_update_url
    assert_response :success
  end

  test "should get destroy" do
    get blog_destroy_url
    assert_response :success
  end
end
