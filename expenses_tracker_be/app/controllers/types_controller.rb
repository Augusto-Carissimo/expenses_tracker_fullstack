class TypesController < ApplicationController

  def create
    CreateType.new(params: type_params, flash: flash).call
    redirect_to root_path
  end

  private

  def type_params
    params.require(:type).permit(:name)
  end
end
