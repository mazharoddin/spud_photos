Spud Blog
========

Spud Photo Albums is an engine for creating and managing photo galleries, designed for use with [Spud][1].

Installation/Usage
------------------

1. In your Gemfile add the following

		gem 'spud_core', :git => "git://github.com/davydotcom/spud_core_admin.git"
		gem 'spud_photos', :git => "git://github.com/gregawoods/spud_photos.git"

2. Run bundle install
3. Copy in database migrations to your new rails project

		bundle exec rake spud_core:install:migrations
		bundle exec rake spud_photos:install:migrations
		rake db:migrate

4. Run a rails server instance and point your browser to /spud/admin

Configuration
-------------

Spud Blog current accepts the following configuration options.

	Spud::Photos.configure do |config|
	  config.base_layout = 'photos'
	end

[1]:https://github.com/davydotcom/spud_core_admin