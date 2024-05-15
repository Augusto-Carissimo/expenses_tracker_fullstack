FactoryBot.define do
  factory :type do
    name { Faker::ChuckNorris.fact }
  end
end
