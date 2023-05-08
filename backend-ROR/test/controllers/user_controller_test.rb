require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  fixtures :users
  test "should get create and return error about already been taken" do
    post user_index_url, params: { email: users(:jt_one).email, password: "Heyther123", first_name: users(:jt_one).first_name,  last_name: users(:jt_one).first_name }
    assert_response :bad_request
  end
  test "should get create" do
    post user_index_url, params: { email: "Test1234", password: "Heytest1234", first_name: users(:jt_one).first_name,  last_name: users(:jt_one).first_name }
    assert_response :success
  end

end
