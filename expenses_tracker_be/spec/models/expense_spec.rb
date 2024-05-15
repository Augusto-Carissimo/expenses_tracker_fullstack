require 'rails_helper'

RSpec.describe Expense, type: :model do

  describe 'associations' do
    it { is_expected.to belong_to(:type) }
  end

  describe 'validation' do
    it { is_expected.to validate_numericality_of(:cost).is_greater_than_or_equal_to(0) }
  end
end
