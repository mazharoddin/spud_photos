module Spud
  module Photos
    require 'responds_to_parent.rb'
 		require 'spud_photos/configuration'
		require 'spud_photos/engine' if defined?(Rails)
  end
end