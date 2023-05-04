require "test_helper"

class BlogControllerTest < ActionDispatch::IntegrationTest

  test "user should be able to update blog" do
    get blog_update_url
    assert_response :success
  end


end
