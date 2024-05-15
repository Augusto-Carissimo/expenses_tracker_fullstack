# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  resources :types
  resources :expenses
  get 'home/test'
end
