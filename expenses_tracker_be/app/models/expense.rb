class Expense < ApplicationRecord
  scope :current_month, -> { where("extract(month from created_at) = ?", Time.now.month) }

  belongs_to :type

  validates :cost, numericality: { greater_than_or_equal_to: 0 }
end
