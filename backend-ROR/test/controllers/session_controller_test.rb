require 'test_helper'
require_relative '../../lib/json_web_token'

class SessionControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user1 = users(:user1)
  end
  test 'login works when credentials are good' do
    post '/login', params: { email: @user1.email, password: 'password1' }, as: :json
    assert_response :created
    assert JSON.parse(response.body)['first_name'] == @user1.first_name
    assert JSON.parse(response.body)['last_name'] == @user1.last_name
    assert JsonWebToken.decode(JSON.parse(response.body)['token'])['user_id'] == @user1.id
  end
  test 'login fails when username is bad' do
    post '/login', params: { email: 'nope, not a valid email', password: 'password1' }, as: :json
    assert_response :unauthorized
  end
  test 'login fails when password is bad' do
    post '/login', params: { email: @user1.email, password: 'bad password >:3' }, as: :json
    assert_response :unauthorized
  end
  test 'login fails when json is missing' do
    post '/login'
    assert_response :unauthorized
  end
end
