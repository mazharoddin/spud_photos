# NOTICE

This project is not actively maintained. I will do my best to provide fixes in so far as supporting existing users on Rails 3.x. For Rails 4 and beyond, please either:

- Check out [Twice Bakes Photos](https://bitbucket.org/westlakedesign/tb_photos), a fork off the Spud platform, or
- Consider [forking this project](https://github.com/gregawoods/spud_photos/fork) and making a pull request

Thanks!

---

# Spud Photos

Spud Photos is an engine for creating and managing photo galleries, designed for use with [Spud][1].

## Installation/Usage

1. In your Gemfile add the following

		gem 'spud_photos'

2. Run bundle install
3. Copy in database migrations to your new rails project

		bundle exec rake railties:install:migrations
		rake db:migrate

4. Run a rails server instance and point your browser to /spud/admin

## Configuration

Spud Photos accepts the following configuration options. Place them in `application.rb` or in an initializer.

	Spud::Photos.configure do |config|
	  config.base_layout = 'application'
	  config.galleries_enabled = false
	  config.base_path = 'photos'
	  config.photo_styles = {
	    :small => '50x50#',
	    :medium => '200x200#',
	    :large => '400x400#',
	    :huge => '600x600'
	  }
	  config.paperclip_storage = :filesystem #use :s3 to use s3 storage (aws gem required)
    	  config.s3_credentials = "#{Rails.root}/config/s3.yml"
    	  config.storage_path = ":rails_root/public/system/spud_photos/:id/:style/:basename.:extension"
    	  config.storage_url = "/system/spud_photos/:id/:style/:basename.:extension"
    	  config.s3_host_name = "s3.amazonaws.com" #Defaults to us east zone, change for other regions.
	end

The `photo_styles` option will be passed to [Paperclip][2], so any valid paperclip styles can be added here.

## Galleries

A Gallery is just an additional layer of organization above the Album layer. For example, a Gallery called "Vacations" might include Albums titled "Europe", "Hawaii", and "Florida". Galleries are turned off by default. 

## Customizing Views

A number of built-in views have been provided to help you get started with the frontend display. Customizing these views will require you to copy them into your local application, which can be accomplished by using the views generator. 

	rails generate spud:photos:views

__NOTE:__ The built-in views are likely to undergo changes as features are added to the photos engine. If a new version of Spud Photos does not play nicely with your customized views, try backing up your views to an alternate location and running the views generator again to see what has changed. 


[1]:https://github.com/davydotcom/spud_core_admin
[2]:https://github.com/thoughtbot/paperclip

Testing
-----------------

Spud uses RSpec for testing. Get the tests running with a few short commands:

1. Create and migrate the databases:
   
        rake db:create
        rake db:migrate

2. Load the schema in to the test database:

        rake app:db:test:prepare

3. Run the tests with RSpec

        rspec spec

After the tests have completed the current code coverage stats is available by opening ```/coverage/index.html``` in a browser.
