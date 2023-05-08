Rails.application.routes.draw do
  # get 'blog/index'
  # get 'blog/show'
  # get 'blog/create'
  # get 'blog/update'
  # get 'blog/destroy'
  # get 'user/create'
  # get 'user/destroy'

  resources :user, only: [:create, :destroy] do 
    
    resources :blog do
      put '/viewcount', to: "blog#update_viewcount"
    end
  end

  get '/blog', to: 'blog#indexall'
  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
