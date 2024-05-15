class DolarService
  include HTTParty

  CACHE_KEY = 'dolar_price'.freeze
  CACHE_EXPIRATION = 1.hour

  def fetch_dolar_price
    Rails.cache.fetch(CACHE_KEY, expires_in: CACHE_EXPIRATION) do
      response = self.class.get('https://api.bluelytics.com.ar/v2/latest')
      price = response['blue']['value_avg'].to_d
      price.round(2)
    end
  end
end