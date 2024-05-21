class TypesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    CreateType.new(params: type_params, flash: flash).call
    render json: { message: 'Creating Type' }, status: :ok
  end

  def index
    @types = AllTypes.new.call
    render json: @types
  end

  private

  def type_params
    params.require(:type).permit(:name)
  end
end
