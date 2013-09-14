/**
 * @class FREON.FeedViewer
 * @extends Ext.container.Viewport
 *
 * The main FeedViewer application
 * 
 * @constructor
 * Create a new Feed Viewer app
 * @param {Object} config The config object
 */

Ext.define('FREON.App', {
    extend: 'Ext.container.Viewport',
    
    initComponent: function(){
        
        Ext.define('Feed', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'title'
            }, {
                name: 'url'
            }]
        });

        Ext.define('FeedItem', {
            extend: 'Ext.data.Model',
            fields: [
                'title', 
                'author', {
                    name: 'pubDate',
                    type: 'date'
                }, 
                'link', 
                'description', 
                'content', 
                {
                    name: 'summary', 
                    convert: function (value, record) {
                        var excerpt = Ext.util.Format.stripTags(record.get('description')).substr(0, 200);
                        return excerpt + '...';
                    }
                }]
        });
        
        Ext.apply(this, {
            layout: {
                type: 'border',
                padding: '50 5 5 5'
            },
            items: [this.createFeedPanel(), this.createFeedInfo()]
        });
        this.callParent(arguments);
    },
    
    /**
     * Create the list of fields to be shown on the left
     * @private
     * @return {FREON.FeedPanel} feedPanel
     */
    createFeedPanel: function(){
        this.feedPanel = Ext.create('widget.feedpanel', {
            region: 'west',
            collapsible: true,
            width: 225,
            //floatable: false,
            split: true,
            minWidth: 175,
            feeds: [{
                title: 'Sencha Blog',
                url: 'http://feeds.feedburner.com/extblog'
            }, {
                title: 'Sencha Forums',
                url: 'http://sencha.com/forum/external.php?type=RSS2'
            }, {
                title: 'Ajaxian',
                url: 'http://feeds.feedburner.com/ajaxian'
            }],
            listeners: {
                scope: this,
                feedselect: this.onFeedSelect
            }
        });
        return this.feedPanel;
    },
    
    /**
     * Create the feed info container
     * @private
     * @return {FREON.FeedInfo} feedInfo
     */
    createFeedInfo: function(){
        this.feedInfo = Ext.create('widget.feedinfo', {
            region: 'center',
            minWidth: 300
        });
        return this.feedInfo;
    },
    
    /**
     * Reacts to a feed being selected
     * @private
     */
    onFeedSelect: function(feed, title, url){
        this.feedInfo.addFeed(title, url);
    }
});
