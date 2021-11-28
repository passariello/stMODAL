/*!
 * stMODAL <https://github.com/passariello/stMODAL>
 *
 * Copyright (c) 2021, Dario Passariello.
 * Licensed under the Apache-2.0 License.
 */

/***********************************************************************/

(function () {

  // LOAD PACKAGE INFO
  const pjson = require('./package.json');

  // SCRIPTS
  require('./scripts/alert');
  require('./scripts/confirm');
  require('./scripts/popup');

  // FIRST MESSAGE
  console.debug( `%cstMODAL v${pjson.version}%c by Dario Passariello started`,"color:orange","" );
  console.debug( "%cType stMODAL in this console to see it", "color:gray","" );
  console.debug( "%cFor help visit: " + pjson.repository.help, "color:gray","" );
  console.groupCollapsed( '%cstMODAL General%c',"color:orange","" );
    console.debug( 'name: %c' + pjson.name,"color:orange","" );
    console.debug( 'version: %c' + pjson.version,"color:orange","" );
    console.debug( 'description: %c' + pjson.description,"color:orange","" );
    console.debug( 'license: %c' + pjson.license,"color:orange","" );
    console.debug( 'repository: %c' + pjson.repository.url,"color:orange","" );
    console.debug( 'author: %c' + pjson.author.name,"color:orange","" );
    console.debug( 'website: %c' + pjson.author.website,"color:orange","" );
    console.debug( 'email: %c' + pjson.author.email,"color:orange","" );
  console.groupEnd();

})();
