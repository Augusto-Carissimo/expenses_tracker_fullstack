# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  resources :types
  resources :expenses, except: [:show]
  get 'home/test'
  get 'expenses/total_expenses', to: 'expenses#total_expenses'
  get 'expenses/monthly_expenses', to: 'expenses#monthly_expenses'
end
