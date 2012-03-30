# Spud Photos

Spud Photos is an engine for creating and managing photo galleries, designed for use with [Spud][1].

## Installation/Usage

1. In your Gemfile add the following

		gem 'spud_core', :git => "git://github.com/davydotcom/spud_core_admin.git"
		gem 'spud_photos', :git => "git://github.com/gregawoods/spud_photos.git"

2. Run bundle install
3. Copy in database migrations to your new rails project

		bundle exec rake spud_core:install:migrations
		bundle exec rake spud_photos:install:migrations
		rake db:migrate

4. Run a rails server instance and point your browser to /spud/admin

## Configuration

Spud Photos accepts the following configuration options:

	Spud::Photos.configure do |config|
	  self.base_layout = 'application'
	  config.galleries_enabled = false
	  config.base_path = 'photos'
	  config.photo_styles = {
	    :small => '50x50#',
	    :medium => '200x200#',
	    :large => '400x400#',
	    :huge => '600x600'
	  }
	end

The `photo_styles` option will be passed to [Paperclip], so any valid paperclip styles can be added here.

## Galleries

A Gallery is just an additional layer of organization above the Album layer. For example, a Gallery called "Vacations" might include Albums titled "Europe", "Hawii", and "Florida". Galleries are turned off by default. 

## Customizing Views

A number of built-in views have been provided to help you get started with the frontend display. Customzing these views will require you to copy them into your local application, which can be accomplished by using the views generator. 

	rails generate spud:photos:views

__NOTE:__ The built-in views are likely to undergo changes as features are added to the blogging engine. If a new version of Spud Photos does not play nicely with your customized views, try backing up your views to an alternate location and running the views generator again to see what has changed. 


[1]:https://github.com/davydotcom/spud_core_admin
[2]:https://github.com/thoughtbot/paperclip