$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "spud_photos/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "spud_photos"
  s.version     = Spud::Photos::VERSION
  s.authors     = ["Greg Woods"]
  s.email       = ["greg@westlakedesign.com"]
  s.homepage    = "http://www.github.com/gregawoods/spud_photos"
  s.summary     = "Spud Photos Engine"
  s.description = "Spud Photos is a feature complete photo management/gallery for the spud engine. Manage multiple galleries, albums, and photos. Use HTML 5 to drag and drop many images at once."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.markdown"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", ">= 3.2.2"
  s.add_dependency 'spud_core', ">= 0.9.0","< 1.0.0"

  s.add_dependency 'paperclip'

  s.add_development_dependency 'mysql2', '0.3.11'
  s.add_development_dependency 'rspec', '2.8.0'
  s.add_development_dependency 'rspec-rails', '2.8.1'
  s.add_development_dependency 'shoulda', '~> 3.0.1'
  s.add_development_dependency 'factory_girl', '2.5.0'
  s.add_development_dependency 'mocha', '0.10.3'
  s.add_development_dependency 'database_cleaner', '0.7.1'
  s.add_development_dependency 'simplecov', '~> 0.6.4'
end
