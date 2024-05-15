# frozen_string_literal: true

# require 'simplecov' unless ENV['SKIP_COV']

# SimpleCov.start 'rails' do
#   enable_coverage :branch
#   primary_coverage :branch

#   minimum_coverage line: 100, branch: 100

#   add_group 'Mutations', 'app/graphql/mutations'
#   add_group 'Types', 'app/graphql/types'
#   add_group 'Use Cases', 'app/use_cases'
# end

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end


RSpec.configure do |config|
  config.use_transactional_fixtures = true

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")

  config.include FactoryBot::Syntax::Methods
  Shoulda::Matchers.configure do |configure|
    configure.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
end

module RSpec
  module Mocks
    class InstanceVerifyingDouble
      def is_a?(expected)
        @doubled_module.target <= expected || super
      end
    end
  end
end