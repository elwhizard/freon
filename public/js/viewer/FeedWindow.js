/**
 * @class FREON.FeedWindow
 * @extends Ext.window.Window
 *
 * Shows a dialog for creating and validating a new feed.
 * 
 * @constructor
 * Create a new Feed Window
 * @param {Object} config The config object
 */

Ext.define('FREON.FeedWindow', {
    extend: 'Ext.window.Window',
    
    alias: 'widget.feedwindow',

    plain: true,
    resizable: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: '#feed',

    defaultFeeds: [
        ['http://rss.cnn.com/rss/edition.rss', 'CNN Top Stories'],
        ['http://sports.espn.go.com/espn/rss/news', 'ESPN Top News'],
        ['http://news.google.com/news?ned=us&topic=t&output=rss', 'Sci/Tech - Google News'],
        ['http://rss.news.yahoo.com/rss/software', 'Yahoo Software News']
    ],
    
    initComponent: function(){
        var me = this;
        me.addEvents(
            /**
             * @event feedvalid
             * @param {FREON.FeedWindow} this
             * @param {String} title
             * @param {String} url
             * @param {String} description
             */
            'feedvalid'
        );
        
        me.form = Ext.create('widget.form', {
            bodyPadding: '12 10 10',
            border: false,
            defaults: {
                labelWidth: 50
            },
            items: [{
                itemId: 'feed',
                allowBlank: false,
                vtype: 'url',
                anchor: '100%',
                fieldLabel: 'URL',
                labelAlign: 'left',
                msgTarget: 'under',
                xtype: 'textfield'
            }, {
                itemId: 'title',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: 'Title',
                labelAlign: 'left',
                msgTarget: 'under',
                xtype: 'textfield'
            }]
        });
        Ext.apply(me, {
            width: 400,
            title: 'Add Feed',
            iconCls: 'feed',
            layout: 'fit',
            items: me.form,
            buttons: [{
                xtype: 'button',
                text: 'Add Feed',
                scope: me,
                handler: me.onAddClick
            }, {
                xtype: 'button',
                text: 'Cancel',
                scope: me,
                handler: me.doHide
            }]
        });
        me.callParent(arguments);
    },
    
    doHide: function(){
        this.hide();
    },
    
    /**
     * React to the add button being clicked.
     * @private
     */
    onAddClick: function(addBtn) {        
        var url = this.form.getComponent('feed').getValue(), 
            title = this.form.getComponent('title').getValue();

        if (!this.form.isValid()) return;

        addBtn.disable();

        this.form.setLoading({
            msg: 'Validating feed...'
        });

        Ext.Ajax.request({
            url: '/feeds/add',
            params: {
                title: title,
                feed: url
            },
            success: this.validateFeed,
            failure: this.markInvalid,
            scope: this
        });
    },
    
    /**
     * React to the feed validation passing
     * @private
     * @param {Object} response The response object
     */
    validateFeed: function(response) {
        this.form.setLoading(false);
        this.down('button[text=Add Feed]').enable();

        var res = Ext.decode(response.responseText);
        var feedsStore;
        
        if (res.success) {
            feedsStore = Ext.getStore('feedsStore');
            feedsStore.add(res.data);
            this.hide();
        } else {
            this.markInvalid(res.message);
        }        
        
    },
    
    /**
     * React to the feed validation failing
     * @private
     */
    markInvalid: function(message){

        var errMsg = (message) ? message : 'The URL specified is not a valid RSS2 feed.';

        this.down('button[text=Add Feed]').enable();
        this.form.setLoading(false);

        this.form.getComponent('feed').markInvalid(errMsg);
    }
});