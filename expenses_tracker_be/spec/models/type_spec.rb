require 'rails_helper'

RSpec.describe Type, type: :model do

  describe 'associations' do
    it { is_expected.to have_many(:expenses) }
  end

  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe 'methods' do
    let!(:type) { create(:type) }
    let!(:expense1) { create(:expense, type:, cost: 100, created_at: DateTime.current) }
    let!(:expense2) { create(:expense, type:, cost: 100, created_at: (DateTime.current - 1.months)) }

    it 'month expense' do
      expect(type.month_expense).to eq(100)
    end

    it 'total expense' do
      expect(type.total_expense).to eq(200)
    end
  end
end
