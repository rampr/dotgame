var _ = require('underscore')._;

var Queue = function () {
  var queue = {};

  /*
   * Add item into the queue
   * @param: item to add to be added
   */
  this.enqueue = function(key, val) {
    if(!queue[key]) {
      queue[key] = val;
      return true;
    }
    console.log('user already present, not added');
    return false;
  },

  /*
   * Remove the first two items in the queue
   */
  this.dequeue = function() {
    if (_.size(queue) < 2) return {};
    var item = _.clone(queue);
    var keys = _.keys(queue);
    _.each(keys, function(key) {
      delete(queue[key]);
    });
    return item;
  },

  /*
   * Remove the a particular item from the queue
   * @param: item to be removed
   */
  this.remove = function(item) {
    if(queue[item])
      delete(queue[item]);
  },

  this.getAll = function() {
    return queue;
  },

  this.getSize = function() {
    return queue.length;
  }
}
module.exports = new Queue();
