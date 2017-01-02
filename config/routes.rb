Rails.application.routes.draw do
  devise_for :users
  root to: 'dashboard#index'
  resources :customers, only: :index
  get 'angular_test' => 'angular_test#index'
end
