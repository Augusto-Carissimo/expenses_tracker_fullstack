class CreateType
  def initialize(params:, flash:)
    @params = params
    @flash = flash
  end

  def call
    @type = Type.new(@params)
    @flash[:notice] = 'New type of expense added' if @type.save
    handle_save_error
  end

  private

  def handle_save_error
    @flash[:alert] = 'Failed to create type:'
    @type.errors.full_messages.each do |message|
      @flash[:alert] += " #{message}."
    end
    Rails.logger.error "Failed to create type: #{@type.errors}"
  end
end
