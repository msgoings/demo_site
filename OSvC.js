(function pendoInAppKnowledgebase(dom) {

    var retrieveTopTen = pendo._.debounce(function(e) {
        var featuredArticleIds = ["17577", "27775", "13694", "27675", "27902", "13722", "11644", "14526", "12897", "12021"];

        function expandable(suggestion){
            if(suggestion.lastElementChild.classList.contains('_pendo-kb-acc-collapsed')) {
                suggestion.classList.add('_kb-acc-active');
                suggestion.classList.remove('_kb-acc-collapsed');
                suggestion.lastElementChild.style.height="auto";
                suggestion.lastElementChild.classList.add('_pendo-kb-acc-active');
                suggestion.lastElementChild.classList.remove('_pendo-kb-acc-collapsed');
                suggestion.lastElementChild.style.display="block";
            } else {
                suggestion.classList.remove('_kb-acc-active');
                suggestion.classList.add('_kb-acc-collapsed');
                suggestion.lastElementChild.classList.remove('_pendo-kb-acc-active');
                suggestion.lastElementChild.classList.add('_pendo-kb-acc-collapsed');
                suggestion.lastElementChild.style.display="none";
            }
        }
        contentLoading();
        dom(resultsElement).html('');
        switchResultsContext('suggested');
        show(topSearch);

        var requestsArr = [];
        var responses = [];
        pendo._.each(featuredArticleIds, function (id) {
            requestsArr.push({
                url: searchUrl + id,
                method: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            });
        });
        pendo._.each(requestsArr, function (request) {
            responses.push(pendo.ajax(request));
        });

        Promise.all(responses)
            .then(function (response) {
                pendo._.each(response, function(item) {
                    if (!pendo._.isEmpty(item.data.data.answers)) {
                        makeSuggestions(item.data.data.answers);
                        switchResultsContext('suggested');
                        contentLoaded(resultsElement);
                    }
                });
                pendo._.each(pendo.dom("._pendo-suggestions-collapsible"), function(suggestion) {
                    suggestion.previousSibling.removeEventListener('click', function() {
                        expandable(suggestion.parentElement)
                    });
                    suggestion.classList.add('_pendo-kb-acc-collapsed');
                    suggestion.style.display="none";
                    suggestion.previousSibling.addEventListener('click', function() {
                        expandable(suggestion.parentElement)
                    });
                });
            })
            .catch((err) => console.log(err));

    }, 1000);


    var launcherDiv = dom('#_pendo-kb_');
    var resultsElement = dom('._pendo-section-content-body-results_');
    var emptySearch = dom('._pendo-section-content-search-empty_');
    var searchInput = dom('#_pendo-launcher-kb-search-input_');
    var topSearch = dom('._pendo-section-content-body-top-searches_');
    var clearSearchIcon = dom('._pendo-launcher-clear-search-icon_');
    var articleDisplay = dom('._pendo-section-content-body-article_');
    var loadingContentElement = dom('._pendo-ext-search-controller-loading_');
    var invisibleClass = '_pendo-invisible_';


    //retrieve all articles as soon as the module loads, use that to power suggestedArticlesTemplate

    var knowledgeBaseURL = 'https://service.elsevier.com/cgi-bin/elsevier5.cfg/php/custom/custom-api-kb.php?route=answers&supporthub=reaxys';
    var articleLinkUrl = knowledgeBaseURL
    var searchUrl =
        knowledgeBaseURL + '&search=';
    var articleUrl = knowledgeBaseURL;

    var containerStyles =
        '._pendo-ext-zoom-container_{position:absolute;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);filter:alpha(opacity=100);opacity:1;z-index:300002}';
    var contentStyles =
        '._pendo-ext-zoom-content_{position:relative;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=1);filter:alpha(opacity=100);opacity:1;max-height:none;max-width:none;height:auto;}';
    var overlayStyles =
        '._pendo-ext-zoom-overlay_{background-color:#fff;position:fixed;top:0;bottom:0;left:0;right:0;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);filter:alpha(opacity=0);opacity:0;z-index:300001;cursor:progress;}._pendo-ext-zoom-overlay_._pendo-ext-zoom-overlay-active_{-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=85);filter:alpha(opacity=85);opacity:0.85;cursor:zoom-out;}';
    var styles = containerStyles + contentStyles + overlayStyles;
    var transitionDuration = 300;
    var margin = 80;
    var container = null;
    var overlay = null;
    var content = null;

    //start by populating the suggested articles list
    retrieveTopTen();


    pendo
        .dom('body')
        .on(
            'click',
            '._pendo-ext-zoom-overlay_, ._pendo-ext-zoom-container_',
            function(e) {
                pendo.log('removing overlay');
                triggerZoomOut();
            }
        );

    function renderFeaturedArticles(data){
        pendo._.each(data, (suggestion) => {
            dom(resultsElement).append(
                '<li class="_pendo-tt-suggestion_"><a  class="_pendo-article-link_" data-id="' +
                    suggestion.ID +
                    '" target="_pendo-section-content-helpcenter-article-frame_">' +
                    suggestion.Summary +
                    '</a></li>'
            );
        });
    }

    function injectStyles(id, styles) {
        if (document.getElementById(id)) return;
        // Older versions of IE do not like it when you try to create <style> tags
        // https://www.quirksmode.org/bugreports/archives/2006/01/IE_wont_allow_documentcreateElementstyle.html
        var stylesContainer = document.createElement('div');
        stylesContainer.innerHTML =
            '<p>pendo</p><style id="' +
            id +
            '" type="text/css">' +
            styles +
            '</style>';
        document
            .getElementsByTagName('head')[0]
            .appendChild(stylesContainer.childNodes[1]);
    }

    function setTransformStyles(element, transform) {
        dom(element).css({
            webkitTransform: transform,
            mozTransform: transform,
            msTransform: transform,
            oTransform: transform,
            transform: transform,
            cursor: 'zoom-out'
        });

        if (transform === '') {
            dom(element).css({
                '-ms-filter':
                    'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
                filter: 'alpha(opacity=0)',
                opacity: 0,
                cursor: 'default'
            });
        }
    }

    function addZoomListeners() {
        pendo.attachEvent(window, 'scroll', triggerZoomOut);
        pendo.attachEvent(window, 'resize', triggerZoomOut);
        // pendo.attachEvent(document, 'click', handleClick);
    }

    function removeZoomListeners() {
        // pendo.detachEvent(document, 'click', handleClick);
        pendo.detachEvent(window, 'scroll', triggerZoomOut);
        pendo.detachEvent(window, 'resize', triggerZoomOut);
    }

    function initZoom(selectedImage) {
        console.log('initializing zoom for image: ', selectedImage);
        injectStyles('_pendo-ext-zoom-styles_', styles);

        // var targetElement = document.createElement(target.type.toLowerCase());
        var targetElement = document.createElement('img');
        dom(targetElement)
            .addClass('_pendo-ext-zoom-content_')
            .css({
                cursor: 'progress',
                width: selectedImage.width + 'px',
                transition: 'all ' + transitionDuration + 'ms'
            })
            .on('load', function(selectedImage) {
                triggerZoomIn(selectedImage);
            })
            .attr('src', selectedImage.src);
        content = targetElement;

        console.log('zoom content created: ', targetElement, content);

        // this is slightly different from the actual version
        var offset = calculateOffset(selectedImage);
        console.log('calculated offset: ', offset);
        addZoomListeners();
        console.log('zoom listeners added');
        createZoomElements(offset, content);
    }

    function createZoomElements(offset, content) {
        console.log(
            'creating zoom elements with offset and content: ',
            offset,
            content
        );
        container = dom('<div/>')
            .addClass('_pendo-ext-zoom-container_')
            .css({
                cursor: 'progress',
                top: offset.top + 'px',
                left: offset.left + 'px',
                transition: 'all ' + transitionDuration + 'ms'
            })
            .append(content)
            .appendTo(dom.getBody());

        overlay = dom('<div/>')
            .addClass('_pendo-ext-zoom-overlay_')
            .css({
                transition: 'all ' + transitionDuration + 'ms'
            })
            .appendTo(dom.getBody());

        console.log('zoom elements created: ', container, overlay);
    }

    function triggerZoomIn(targetEvent) {
        console.log('zoom-in triggered for target: ', targetEvent);
        var target = targetEvent.path
            ? targetEvent.path[0]
            : targetEvent.target;
        var contentOffset = calculateOffset(target); // ExtensionAPI.Util.getOffsetPosition(content);
        var viewportX = window.innerWidth / 2;
        var viewportY = window.pageYOffset + window.innerHeight / 2;
        var contentCenterX = contentOffset.left + target.width / 2;
        var contentCenterY = contentOffset.top + target.height / 2;
        var translateX = Math.round(viewportX - contentCenterX);
        var translateY = Math.round(viewportY - contentCenterY);

        var contentTransform = 'scale(' + calculateScaleFactor(target) + ')';
        var containerTransform =
            'translate(' +
            translateX +
            'px, ' +
            translateY +
            'px) translateZ(0)';

        if (pendo._.isUndefined(content))
            var content = dom('._pendo-ext-zoom-content_');
        setTransformStyles(content, contentTransform);
        console.log('content transform style set');

        if (pendo._.isUndefined(container))
            var container = dom('._pendo-ext-zoom-container_');
        setTransformStyles(container, containerTransform);
        console.log('container transform style set');

        if (pendo._.isUndefined(overlay))
            var overlay = dom('._pendo-ext-zoom-overlay_');
        overlay.addClass('_pendo-ext-zoom-overlay-active_');
        console.log('overlay active');
    }

    function triggerZoomOut() {
        console.log('zoom-out triggered');
        removeZoomListeners();

        setTransformStyles(content, '');
        setTransformStyles(container, '');

        overlay.removeClass('_pendo-ext-zoom-overlay-active_').css({
            cursor: 'default'
        });

        setTimeout(function() {
            dispose();
        }, transitionDuration);
    }

    function dispose() {
        // if (!content) return;
        // dom(content).css({
        //     width: null
        // });
        // pendo._.each([content, container, overlay], function (element) {
        //     dom(element).remove();
        // });
        // content = null;
        pendo.dom('._pendo-ext-zoom-overlay_').remove();
        pendo.dom('._pendo-ext-zoom-container_').remove();
    }

    function calculateScaleFactor(target) {
        console.log('calculating scale factor for target: ', target);
        var zoomScaleFactor = null;
        var naturalWidth = target.naturalWidth;
        var naturalHeight = target.naturalHeight;
        var maxScaleFactor = naturalWidth / target.width;
        var viewportHeight = window.innerHeight - margin;
        var viewportWidth = window.innerWidth - margin;
        var contentAspectRatio = naturalWidth / naturalHeight;
        var viewportAspectRatio = viewportWidth / viewportHeight;

        if (naturalWidth < viewportWidth && naturalHeight < viewportHeight) {
            zoomScaleFactor = maxScaleFactor;
        } else if (contentAspectRatio < viewportAspectRatio) {
            zoomScaleFactor = (viewportHeight / naturalHeight) * maxScaleFactor;
        } else {
            zoomScaleFactor = (viewportWidth / naturalWidth) * maxScaleFactor;
        }
        console.log('scale factor: ', zoomScaleFactor);
        return zoomScaleFactor;
    }

    // test to make sure this works after scrolling
    function calculateOffset(target) {
        console.log('calculating offset for target: ', target);
        var rect = target.getBoundingClientRect();
        var calcTop = window.innerHeight / 2 - rect.height / 2;
        var calcLeft = window.innerWidth / 2 - rect.width / 2;
        return {
            top: calcTop,
            left: calcLeft
        };
    }

    function expandImage(selectedImage) {
        // var imageOverlay = expandedImageTemplate(selectedImage);
        // dom("body").append(imageOverlay);
        initZoom(selectedImage);
    }

    launcherDiv
        .on('input', '._pendo-launcher-search-box_', function(e) {
            dom(articleDisplay).html('');
            if (
                e.which === 8 ||
                (searchInput[0].value.length > 0 && e.which !== 9)
            ) {
                delaySearch(e);
            } else if (searchInput[0].value.length == 0) {
                dom(articleDisplay).html('');
                switchResultsContext('suggested');
                show(topSearch);
                retrieveTopTen();
            }
        })
        .on(
            'click',
            '._pendo-section-content-clear-search_, ._pendo-launcher-clear-search-icon_',
            function(e) {
                dom(articleDisplay).html('');
                resetSearch(e);
                dom(topSearch).removeClass(invisibleClass);
                dom(topSearch).html(headerTemplate('suggested'));
            }
        )
        .on('click', '._pendo-back-to-results_', function(e) {
            dom(articleDisplay).html('');
            hide(articleDisplay);
            show(topSearch);
            show(resultsElement);
        })
        // HEADS UP:  This is different from standard
        //select an article, invoke displaying article using its ID

        //Also MF note: I botched the naming convention, and swapped the two button class names semantically, but
        //I don't have time to untangle the namespace wires. Sorry future engineers <3
        .on('click', '._pendo-no-special-response_, ._pendo-suggestions-view-in-hc a', function(e) {
            // Click Event Listener to display KB articles

            // we can probably optimize this since we will already have the article
            // data from the initial search/suggestion query
            var articleId = eventTarget(e).dataset.id;
            var articleContentConfig = {
                url: articleUrl + "&search=" + articleId,
                method: 'GET'
            };

            if (!pendo._.isUndefined(articleId)) {
                pendo
                    .ajax(articleContentConfig)
                    .then(function(response) {
                        displayArticleData(response, articleId);
                    })
                    .fail(function(error) {
                        console.error(error);
                        contentLoaded(resultsElement);
                        return errorState(error);
                    });
            }
        })
        .on(
            'click',
            '._pendo-section-content-article_ img.expandable',
            function(e) {
                var selectedImage = eventTarget(e);
                expandImage(selectedImage);
            }
        );

    function eventTarget(e) {
        return (e && e.target) || e.srcElement;
    }

    var delaySearch = pendo._.debounce(resetContainerAndSendSearch, 500, false);

    function resetContainerAndSendSearch(e) {
        dom(resultsElement).html('');
        dom(emptySearch).remove();
        show(resultsElement);
        if (searchInput[0].value.trim() === '') {
            // If no value, remove elements and show suggestions
            resetSearch(e);
        } else {
            // Remove suggestions and fetch articles with supplied input value
            hide(topSearch);
            getArticles(searchInput[0].value.trim(), e);
        }
    }

    // Wrapper to check prerequisites before sending any request
    function getArticles(inputValue, e) {
        // Remove any enter presses or invalid length values
        if (
            inputValue.length < 1 ||
            //e.keyCode === 16 ||
            // e.keyCode === 8 ||
            //e.keyCode === 32 ||
            e.keyCode === 9 //||
            //e.keyCode === 13
        ) {
            return false;
        } else {
            var query = unescape(inputValue);

            // Send query to method for request
            return getArticlesFromApi(query, e);
        }
    }

    function getLocation(url) {
        var match = url.match(
            /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
        );
        return (
            match && {
                href: url,
                protocol: match[1],
                host: match[2],
                hostname: match[3],
                port: match[4],
                pathname: match[5],
                search: match[6],
                hash: match[7]
            }
        );
    }

    function getSuggestionsPath(usersUrl) {
      var path = getLocation(usersUrl).pathname;
      var query = '""';
      var suggestions = false;

      if (path.length > 1) {
        suggestions = true;
        query = pendo._.each(path.split('/'), function(item) {
          return item;
        }).join('%20');
      }

      // Building the search request
      var queryUrl = searchUrl + query;

      return { "suggestions":suggestions, "queryUrl":queryUrl };

    }

    // Convenience to quickly show elements
    function show(element) {
        dom(element).removeClass(invisibleClass);
    }

    // Convenience to quickly hide elements
    function hide(element) {
        dom(element).addClass(invisibleClass);
    }

    function resetSearch(e) {
        searchInput[0].value = '';
        switchResultsContext('suggested');
        show(topSearch);
        dom(resultsElement).html('');
        hide(articleDisplay);
        dom(emptySearch).remove();
        show(resultsElement);
        retrieveTopTen();
    }

    // Template to display when loading
    function contentLoading() {
        hide(topSearch);
        hide(clearSearchIcon);
        //show(loadingContentElement);
        show(".es-progress-indicator");
        hide(resultsElement);
        hide(articleDisplay);
    }

    // Remove the loading content/elements
    function contentLoaded(element) {
        setTimeout(function() {
            hide(".es-progress-indicator");
            //hide(loadingContentElement);
            show(element);
            // show(articleDisplay);
            if (searchInput[0].value !== '') {
                show(clearSearchIcon);
            }
        }, 600);
    }

    function displayArticleData(response, articleId) {
        var selectedArticle = response.data.data.answers[0];

        searchInput[0].blur();
        hide(topSearch);
        hide(resultsElement);
        show(articleDisplay);
        dom(articleDisplay).append(articleHeaderTemplate(selectedArticle));

        var articleContent = [
            '<div class="_pendo-section-content-article_" id=" ' +
                articleId +
                '">',
            '<div class="_pendo-article-content-main_">',
            '<h2>' + selectedArticle.Summary + '</h2>',
            '<div class="presentation">' + selectedArticle.Solution + '</div>',
            '</div>',
            '</div>'
        ].join('\n');
        articleDisplay.append(articleContent);

        processImages();
        processLinks();
    }

    function checkImageProperties(image) {
        /**
         * Determines whether an img element has the right width properties
         * @param {Object} image an img element
         * @return {Boolean} true when the properties are on the image
         */
        var checkForImageWidth = setInterval(function() {
            pendo.log('Checking for image properties');
            if (image.width && image.naturalWidth) {
                pendo.log(
                    'image: ' + image.width + ' -- ' + image.naturalWidth
                );
                if (image.width < image.naturalWidth)
                    pendo.log('Adding expandable class to image');
                image.classList.add('expandable');
                clearInterval(checkForImageWidth);
            }
        }, 350);
    }

    function processImages() {
        /**
         * Determines whether an img element can receive the expandable class for zoom in functionality
         */
        pendo.log('processing images...');

        var images = dom('._pendo-section-content-article_ img');
        var notes = dom('._pendo-section-content-article_ img[alt="Note.png"]');

        pendo._.each(images, function(image) {
            checkImageProperties(image);
        });
        pendo._.each(notes, function(note) {
            note.style.width = '35px';
        });

        /*
        pendo._.each(images, function(image) {
            var imgSrcSuffix = image.src.substr(image.src.indexOf("sys_attachment.do"))
            image.setAttribute("src", knowledgeBaseURL + imgSrcSuffix);
        });*/
    }

    function processLinks() {
        /**
         * Determines whether an img element can receive the expandable class for zoom in functionality
         */
        pendo.log('processing links...');

        var links = dom('._pendo-section-content-article_ a');

        pendo._.each(links, function(link) {
            var linkHref = link.href;
            if(linkHref.indexOf('.jpg') > -1) {
                link.href = "";
                link.removeAttribute('target');
            }
            if(linkHref.indexOf('#top') > -1) {
                link.remove();
            }
        });
    }

    var makeSuggestions = function(articleListObject) {
        //apply logic to list of articles, then send results to template
        var suggestionList = articleListObject;
        suggestedArticlesTemplate(suggestionList);
    };

    var suggestedArticlesTemplate = function(data) {
        console.debug('building suggested Articles template...');
        pendo._.each(data, function(suggestion) {
            if(suggestion.SpecialResponse){
                dom(resultsElement).append(
                    '<li class="_pendo-tt-suggestion_ _pendo-has-special-response_">'+
                       '<a class="_pendo-article-link_" data-id="' +
                           suggestion.ID +
                        '" target="_pendo-section-content-helpcenter-article-frame_">' +
                            suggestion.Summary +
                        '</a>'+
                        '<div class="_pendo-suggestions-collapsible">'+
                            '<div>' + suggestion.SpecialResponse + '</div>' +
                            '<div class="_pendo-suggestions-learn-more">' +
                            '<a target="_blank" href="' + suggestion.Url + '?utm_medium=ipm"><button class="_pendo-suggestion-learn-more-button">Learn more<img src="https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-f884071b-4436-4b0b-9129-8045cf8ca7b9"></button></a></div>' +
                            '<div class="_pendo-suggestions-view-in-hc">' +'<a data-id="' +
                                suggestion.ID +
                                '"><button ' +
                                'data-id="' +
                                suggestion.ID +
                                '" class="_pendo-suggestion-vic-continue">Continue  <img ' +
                                'data-id="' +
                                suggestion.ID +
                                '" src="https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-03a32354-5800-4cdb-9028-1dc199d73be6"></button></a></div>' +
                        '</div>' +
                    '</li>'
                );
            } else {
                dom(resultsElement).append(
                    '<li class="_pendo-tt-suggestion_ _pendo-no-special-response_"><a class="_pendo-article-link_" data-id="' +
                    suggestion.ID +
                    '" target="_pendo-section-content-helpcenter-article-frame_">' +
                    suggestion.Summary +
                    '</a></li>'
                );
            }
        });
    };

    var searchResultsTemplate = function(data, e) {
        switchResultsContext('search');
        show(topSearch);
        pendo._.each(data, function(allArticles) {
            dom(resultsElement).append(
                '<li class="_pendo-tt-suggestion_ _pendo-no-special-response_"><a class="_pendo-article-link_" data-id="' +
                    allArticles.ID +
                    '" target="_pendo-section-content-helpcenter-article-frame_">' +
                    allArticles.Summary +
                    '</a></li>'
            );
        });
    };

    // Template to display when no results are found
    var notFoundTemplate = function(data) {
        dom(resultsElement).html('');
        switchResultsContext('search');
        show(topSearch);
        var notFound = [
            "<div class='_pendo-section-content-search-empty_'>",
            '<h4>No matches found for <strong>' + data + '</strong></h4>',
            '<p>Try adding a few more letters or check the spelling of your current entry</p>',
            '</div>'
        ].join('\n');
        dom(resultsElement).append(notFound);
    };

    // template to display when no suggestions are found
    var noSuggestionsTemplate = function() {
        dom(resultsElement).html('');
        var notFound = [
            "<div class='_pendo-section-content-suggestions-empty_'>",
            '<h4>For tips, tricks, and how tos, try searching for keywords above</h4>',
            '</div>'
        ].join('\n');
        dom(resultsElement).append(notFound);
    };

    var switchResultsContext = function(state = 'search') {
        var states = {
            suggested: suggested,
            search: search
        };

        function suggested() {
            dom(topSearch).html(headerTemplate('suggested'));
            dom(resultsElement).attr('data-context', 'suggested');
        }

        function search() {
            dom(topSearch).html(headerTemplate('search'));
            dom(resultsElement).attr('data-context', 'search');
        }

        if (!pendo._.isUndefined(state)) {
            return states[state]();
        }
    };

    var headerTemplate = function(state = 'search') {
        var states = {
            suggested: suggestedHeader,
            search: searchHeader
        };

        function suggestedHeader() {
            return [
                '<div class="_pendo-section-content-top-searches-header_">',
                'Top 10 FAQs',
                '</div>'
            ].join('\n');
        }

        function searchHeader() {
            return [
                '<div class="_pendo-section-content-search-header_">',
                'Search Results',
                '<a href="javascript:void(0);" class="_pendo-section-content-clear-search_">Clear</a>',
                '</div>'
            ].join('\n');
        }

        if (!pendo._.isUndefined(state)) {
            return states[state]();
        }
    };

    var articleHeaderTemplate = function(selectedArticle) {
        return [
            '<div class="_pendo-section-content-article-header_">',
            '<div class="_pendo-article-nav_">',
            '<button type="button" class="_pendo-back-to-results_">',
            '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="8 0 18 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="" style="display: inline-block;"><polyline points="15 18 9 12 15 6"></polyline></svg>',
            '<span>Back to Search Results</span>',
            '</button>',
            '</div>',
            '<div class="_pendo-section-content-article-breadcrumbs_">',
            '<h4 class="_pendo-article-breadcrumbs-title_">&nbsp;</h4>',
            '<button class="_pendo-external-link_">',
            '<a href="' +
                selectedArticle.Url +
                '?utm_medium=ipm" target="_blank" data-side="bottom"  data-tooltip="Open article in new tab" title="Open article in new tab" tabindex="0"> <span>Learn more</span>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 15 24"><path d="M13.149 14.39V5.544H4.224V7.34h5.862L1.98 15.393l1.347 1.32 8.053-8.106v5.782z" fill="#8E8E8E"/></svg>',
            '</a>',
            '</button>',
            '</div>',
            '</div>'
        ].join('\n');
    };

    var getArticlesFromApi = pendo._.debounce(function(query, e) {
        contentLoading();

        // Building the search request
        var cfg = {
            url: searchUrl + query,
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        };

        // Request the articles with the input provided
        pendo
            .ajax(cfg)
            .then(function(response) {
                // display results (or no result message)
                if (
                    !pendo._.isUndefined(response.data.data.answers) &&
                    response.data.data.answers.length
                ) {
                    var articleResults = response.data.data.answers;
                    dom(resultsElement).html('');
                    dom(emptySearch).remove();
                    contentLoaded(resultsElement);
                    return searchResultsTemplate(articleResults, e);
                } else {
                    dom(resultsElement).html('');
                    dom(emptySearch).remove();
                    contentLoaded(resultsElement);
                    return notFoundTemplate(query, e);
                }
            })
            .fail(function(error) {
                console.log(error);
                contentLoaded(resultsElement);
                return errorState(error);
            });
    }, 500);
})(pendo.dom);
