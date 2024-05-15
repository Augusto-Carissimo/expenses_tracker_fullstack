class Type < ApplicationRecord
  has_many :expenses

  validates :name, uniqueness: true

  def month_expense
    @month_expense ||= expenses.current_month.map(&:cost).sum
  end

  def total_expense
    @total_expense ||= expenses.map(&:cost).sum
  end
end
