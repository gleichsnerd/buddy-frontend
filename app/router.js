import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('post-office');
  this.route('create-account');
  this.route('logout');
  this.route('mailboxes');
  this.route('address-book');
});

export default Router;
