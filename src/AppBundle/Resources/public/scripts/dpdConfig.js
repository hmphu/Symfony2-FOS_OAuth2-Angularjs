/**
 * Created by sergej on 19.11.15.
 */

(function() {
   'use strict';

    angular.module('app')
        .value('dpdConfig', {
            collections: ['users'],
            serverRoot: 'http://localhost:8000/', // optional, defaults to same server
            socketOptions: { reconnectionDelayMax: 3000 }, // optional socket io additional configuration
            useSocketIo: false, // optional, defaults to false
            noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
        });
})()