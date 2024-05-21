# frozen_string_literal: true

Rails.application.routes.draw do
  resources :types
  resources :expenses, except: [:show]
  get 'expenses/total_expenses', to: 'expenses#total_expenses'
  get 'expenses/monthly_expenses', to: 'expenses#monthly_expenses'
end
