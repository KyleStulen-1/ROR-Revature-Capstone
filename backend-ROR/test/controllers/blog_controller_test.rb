require "test_helper"

class BlogControllerTest < ActionDispatch::IntegrationTest

  def setup
    @userxt = users(:xtone)
    @userxt_token = JsonWebToken.encode('user_id': @userxt.id)
    @Auth_userxt = {'Authorization' => "Bearer #{@userxt_token}"}
    @blogxt = blog(:xtone)
  end 

  test "user should be able to update blog" do
    put user_blog_url(@userxt, @blogxt), header: @Auth_userxt, params: {title: 'change title', content: 'Auth_userxt content 123'} ,as: :json
    assert_response :success
  end


end
