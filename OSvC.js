/**
 * color assignments
 * these variable names match the class name they're tied to
 * want to update the color? simply change the hex code and it will automatically
 * apply that color to the associated class/element.
 *
 * for example, to update the @header--border-bottom color to black, we would use:
 * @pendo-launcher-header--border-bottom: #000;
 *
 * more information on lesscss can be found here: http://lesscss.org/#variables
 *
 */

/* main header */
@header--border-bottom: #f4f4f7;

/* search box + results */
@search-box--background-color: #fff;
@search-box--border-color: #8E8e8e;
@search-box--placeholder-color: #007398;
@search-results--header-text-color: #000000;
@search-results--clear-search-link-color: #2e2e2e;
@search-results--no-results-found-text-color: #000000;
@search-results--no-results-found-subtext-color: #000000;
@search-results--search-display-return-color: #000000;
@search-results--search-highlight-color: #fff5cd;
@search-results--link-hover-color: #E9711C;

/* content section headers */
@section-header--border-bottom-color: #f4f4f7;
@section-footer--border-top-color: #f4f4f7;

/* guides listing in each section */
@guide-list--link-color: #000000;

/* z-index */
@base-zIndex: 200000;
@enableSearchTop: 125px;

/* font */
@font-face {
    font-family: 'verdana', 'geneva', 'sans-serif'!important;
    font-style: normal;
    font-weight: 400;
}

@font-face {
    font-family: 'verdana', 'geneva', 'sans-serif'!important;
    font-style: bold;
    font-weight: 700;
}

@main-font: 'verdana', 'geneva', 'sans-serif'!important;

/* animations/transitions */
@duration: 320ms;
@animation-delay--zero: 0ms;
@animation-delay--half: @duration / 2;
@animation-delay--full: @duration;

/* timing */
@easeInOut: cubic-bezier(0.23, 1, 0.32, 1);

.keyframes (@name; @rules) {
    @-webkit-keyframes @name {
        @rules();
    }
    @-moz-keyframes @name {
        @rules();
    }
    @-ms-keyframes @name {
        @rules();
    }
    @keyframes @name {
        @rules();
    }
}

.opacity(@amount) {
    @opacity: @amount * 100;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=@opacity);
    filter: alpha(opacity=@opacity);
    opacity: @amount;
}

.border-radius (@radius: 3px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;

    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
}

.animation (...) {
    -webkit-animation: @arguments;
    -moz-animation: @arguments;
    -ms-animation: @arguments;
    animation: @arguments;
}

.transition (...) {
    -webkit-transition: @arguments;
    -moz-transition: @arguments;
    -ms-transition: @arguments;
    -o-transition: @arguments;
    transition: @arguments;
}

.transform (...) {
    -webkit-transform: @arguments;
    -moz-transform: @arguments;
    -ms-transform: @arguments;
    -o-transform: @arguments;
    transform: @arguments;
}

/* reset button styles in order to prevent picking up styles  */

button {
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    &::-moz-focus-inner {
        border: 0;
        padding: 0;
    }

    &:focus {
        outline: -webkit-focus-ring-color auto 0;
    }
}

/* font-smooth on displays that support it */

@media only screen and (-webkit-min-device-pixel-ratio: 1.3),
    only screen and (-o-min-device-pixel-ratio: 13/10),
    only screen and (min-resolution: 120dpi) {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

/* ------------------------------
 * -- main launcher/menu view ---
 * ------------------------------ */

 ._pendo-invisible_ {
    display: none !important;
}


._pendo-launcher-content_ {
    line-height: 1em;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}


._pendo-section-content-article-header_ {
    line-height: 24px;
    font-size: 16px;
    margin: 5px 15px 0px;
}

._pendo-kb-search_ {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    height: 60px;
    overflow-y: hidden !important;
}

    /* ------------------------------
   * --------- search box ---------
   * ------------------------------ */
    ._pendo-launcher-search-box_ {
        background-color: @search-box--background-color;
        border-bottom: 3px solid @search-box--border-color;
        border-radius: 0px !important;
        margin: 15px 20px 15px !important;
        position: relative;

        input[type='text'] {
            width: calc(~'100% - 68px');
            padding: 10px 0 14px;
            font-size: 18px;
            font-weight: 400;
            line-height: 32px;
            outline: none;
            border: 0;
            -webkit-appearance: textfield;
            height: 33px !important;
            display: inline-block;
            color: #000;
            &::-webkit-input-placeholder {
                color: @search-box--placeholder-color;
            }
            &::-moz-input-placeholder {
                color: @search-box--placeholder-color;
            }
            &::-ms-input-placeholder {
                color: @search-box--placeholder-color;
            }
            &::-moz-placeholder {
                color: @search-box--placeholder-color;
            }
            &::placeholder {
                color: @search-box--placeholder-color;
            }
            &::-ms-clear {
                display: none;
            }
        }

        ._pendo-launcher-search-icon_,
        ._pendo-launcher-clear-search-icon_,
        ._pendo-ext-search-controller-loading_ {
            max-width: 32px;
            max-height: 32px;
            background-repeat: no-repeat;
            background-position: center;
        }

        ._pendo-launcher-search-icon_ {
            width: 32px;
            height: 23px;
            display: inline-block;
            vertical-align: middle;
            margin: auto;
            margin-right: -4px;
            background-size: 13px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTcuNzIyNTIyMiAxNi4zODI3NDA5bC0xLjMzOTc4MTMgMS4zMzk3ODEzLTQuOTY3NzgyNS00Ljk2Nzc4MjVjLTEuMTk1Mzg4NC45MTMyODk1LTIuNjg5MTg4MzUgMS40NTU3ODY2LTQuMzA5Njk1MjQgMS40NTU3ODY2QzMuMTgxMTM0NyAxNC4yMTA1MjYzIDAgMTEuMDI5MzkxNiAwIDcuMTA1MjYzMTYgMCAzLjE4MTEzNDcgMy4xODExMzQ3IDAgNy4xMDUyNjMxNiAwYzMuOTI0MTI4NDQgMCA3LjEwNTI2MzE0IDMuMTgxMTM0NyA3LjEwNTI2MzE0IDcuMTA1MjYzMTYgMCAxLjYyMDUwNjktLjU0MjQ5NzEgMy4xMTQzMDY4NC0xLjQ1NTc4NjYgNC4zMDk2OTUyNGw0Ljk2Nzc4MjUgNC45Njc3ODI1ek03LjEwNTI2MzE2IDEyLjMxNTc4OTVjMi44Nzc2OTQyIDAgNS4yMTA1MjYzNC0yLjMzMjgzMjE0IDUuMjEwNTI2MzQtNS4yMTA1MjYzNCAwLTIuODc3Njk0Mi0yLjMzMjgzMjE0LTUuMjEwNTI2MzItNS4yMTA1MjYzNC01LjIxMDUyNjMyLTIuODc3Njk0MiAwLTUuMjEwNTI2MzIgMi4zMzI4MzIxMi01LjIxMDUyNjMyIDUuMjEwNTI2MzIgMCAyLjg3NzY5NDIgMi4zMzI4MzIxMiA1LjIxMDUyNjM0IDUuMjEwNTI2MzIgNS4yMTA1MjYzNHoiIGZpbGw9IiNCQUJDQzUiPjwvcGF0aD48L3N2Zz4=');
        }

        ._pendo-launcher-search-icon_ svg {
            display: inline-block;
        }

        ._pendo-launcher-clear-search-icon_ {
            width: 32px;
            height: 32px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            float: right;
            background-size: 14px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTQgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTcsMCBDOC44NTY1MTU0MywxLjEzNjc4Nzg0ZS0xNiAxMC42MzY5OTI4LDAuNzM3NDk3ODgzIDExLjk0OTc0NzUsMi4wNTAyNTI1MyBDMTMuMjYyNTAyMSwzLjM2MzAwNzE4IDE0LDUuMTQzNDg0NTcgMTQsNyBDMTQsMTAuODY1OTkzMiAxMC44NjU5OTMyLDE0IDcsMTQgQzMuMTM0MDA2NzUsMTQgLTQuNzM0NDc2MjZlLTE2LDEwLjg2NTk5MzIgMCw3IEM0LjczNDQ3NjI2ZS0xNiwzLjEzNDAwNjc1IDMuMTM0MDA2NzUsLTIuMzY3MjM4MTNlLTE2IDcsMCBaIE0xMC4wNSw5LjA3NSBMOCw3IEwxMC4wNzUsNC45NSBDMTAuMzUxMTQyNCw0LjY3Mzg1NzYzIDEwLjM1MTE0MjQsNC4yMjYxNDIzNyAxMC4wNzUsMy45NSBDOS43OTg4NTc2MywzLjY3Mzg1NzYzIDkuMzUxMTQyMzcsMy42NzM4NTc2MyA5LjA3NSwzLjk1IEw3LDYgTDQuOTUsMy45MjUgQzQuNjczODU3NjIsMy42NDg4NTc2MyA0LjIyNjE0MjM4LDMuNjQ4ODU3NjQgMy45NTAwMDAwMSwzLjkyNTAwMDAxIEMzLjY3Mzg1NzY0LDQuMjAxMTQyMzggMy42NzM4NTc2Myw0LjY0ODg1NzYyIDMuOTUsNC45MjUgTDYsNyBMMy45MjUsOS4wNSBDMy43ODgwMzU2Miw5LjE4MDI1MzA2IDMuNzEwNDk5NzQsOS4zNjA5ODkxNSAzLjcxMDQ5OTc0LDkuNTUgQzMuNzEwNDk5NzQsOS43MzkwMTA4NSAzLjc4ODAzNTYyLDkuOTE5NzQ2OTQgMy45MjUsMTAuMDUgQzQuMDU1MjUzMDYsMTAuMTg2OTY0NCA0LjIzNTk4OTE1LDEwLjI2NDUwMDMgNC40MjUsMTAuMjY0NTAwMyBDNC42MTQwMTA4NSwxMC4yNjQ1MDAzIDQuNzk0NzQ2OTQsMTAuMTg2OTY0NCA0LjkyNSwxMC4wNSBMNyw4IEw5LjA1LDEwLjA3NSBDOS4zMjYxNDIzNywxMC4zNTExNDI0IDkuNzczODU3NjMsMTAuMzUxMTQyNCAxMC4wNSwxMC4wNzUgQzEwLjMyNjE0MjQsOS43OTg4NTc2MyAxMC4zMjYxNDI0LDkuMzUxMTQyMzcgMTAuMDUsOS4wNzUgWiIgaWQ9IkRlbGV0ZS1Db3B5LTQiIHN0cm9rZT0ibm9uZSIgZmlsbD0iI0JBQkNDNSIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PC9zdmc+');

            &:focus {
                outline: none;
            }
        }

        ._pendo-ext-search-controller-loading_ {
            //opacity: 0;
            width: 32px;
            height: 32px;
            display: flex;
            float: right;
            background-color: transparent;
            background-size: 14px;
            background-image: url("data:image/svg+xml;base64,PHN2Zw0KICB3aWR0aD0nMTYnDQogIGhlaWdodD0nMTYnDQogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgdmVyc2lvbj0iMS4xIg0KICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayINCiAgdmlld0JveD0iMCAwIDMyIDMyIg0KPg0KICA8cGF0aA0KICAgIG9wYWNpdHk9Ii4yNSINCiAgICBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ig0KICAgIGZpbGw9IiNDQ0MiDQogIC8+DQogIDxwYXRoIGQ9Ik0xNiAwIEExNiAxNiAwIDAgMSAzMiAxNiBMMjggMTYgQTEyIDEyIDAgMCAwIDE2IDR6IiBmaWxsPSIjOWE5Y2E1Ij4NCiAgPC9wYXRoPg0KPC9zdmc+");
            -webkit-animation: pendo-ext-spin 0.55s infinite 0.30s linear;
            animation: pendo-ext-spin 0.55s infinite 0.30s linear;
        }
    }


/* ------------------------------
 * ------- search results -------
 * ------------------------------ */

._pendo-launcher-search-results_ {
    display: none;
    overflow-y: auto;
    position: absolute;
    top: @enableSearchTop;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 15px 15px 0;

    ._pendo-launcher-search-results-header_ {
        margin: 0 15px;
        ._pendo-launcher-search-results-header-title_ {
            margin: 0 auto;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            line-height: 32px;
            color: @search-results--header-text-color;
        }
        ._pendo-launcher-clear-search_ {
            font-size: 12px;
            font-weight: normal;
            float: right;
            color: #000000 !important;
            text-decoration: none;
            cursor: pointer;
            background-color: transparent;
            outline: 0;
            border: 0;
            padding: 0;
            background-image: none;
            -webkit-box-shadow: none;
            box-shadow: none;
            height: 32px;
            -webkit-appearance: button;
        }

        ._pendo-launcher-clear-search_:hover {
            color: @search-results--link-hover-color!important;
        }
    }
}



._pendo-launcher-search-results-list_ {
    margin: 0 30px 15px;
    overflow-y: auto;
    line-height: 32px;
}

._pendo-launcher-search-results-container_ {
    line-height: 32px;

    ._pendo-launcher-search-results-section-header_ {
        margin: 0 15px;
        padding: 0;
        font-weight: bold;
        font-size: 14px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 0;
        }
    }
}

&._pendo-launcher-searching_ {
    ._pendo-launcher-search-results_ {
        display: block;
    }

    ._pendo-launcher-menu_,
    ._pendo-launcher-body_ {
        display: none;
    }

    ._pendo-launcher-search-box_ ._pendo-launcher-clear-search-icon_ {
        display: block;
    }
}

._pendo-section-content-search-empty_ {
    text-align: center;
    margin: 50px 0;

    h4 {
        color: @search-results--no-results-found-text-color;
        font-size: 16px;
        font-weight: 400;
        margin: 1.30435em 0;
    }

    p {
        color: @search-results--no-results-found-subtext-color;
        font-size: 12px;
        line-height: 140%;
    }
}

._pendo-launcher-search-display_ {
    display: none;

    ._pendo-launcher-search-highlight_ {
        background-color: @search-results--search-highlight-color;
    }

    ._pendo-launcher-search-header_ h4 {
        margin: 8px auto 15px;
        font-weight: bold;
        font-size: 14px;
    }

    ._pendo-launcher-search-display-return_ {
        position: relative;

        > span {
            color: @search-results--search-display-return-color;
            vertical-align: middle;
            font-size: 14px;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &::before {
            content: '';
            width: 8px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
            background-position: center;
            background-size: 16px;
            background-repeat: no-repeat;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyY2EwYzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==');
        }
    }
}


#_pendo-section-content-helpcenter-article-frame_ {
    border-width: 0;
    border-style: none;
    border-color: none;
    border-image: none;
    margin-top: 5px;
}

._pendo-section-content-search-header_,
._pendo-section-content-body-error_,
._pendo-section-content-top-searches-header_ {
    margin: 8px 0 8px!important;
    position: relative;
    display: block;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    >._pendo-section-content-clear-search_ {
      font-size: 14px;
      font-weight: normal;
      float: right;
      color: #000000;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: @search-results--link-hover-color;
      }
    }
}

._pendo-section-content-top-searches-header_,
._pendo-section-content-search-header_ {
    margin: 0 auto;
}

._pendo-has-special-response_ {
   background-image: url(https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-7fc818bf-6dac-4009-9eff-2607c94e17ba);
   background-repeat: no-repeat;
   background-position: top 15px left;
   > a {
    padding-right: 20px!important;
    margin-left: 30px!important;
    border-bottom: 0px!important;
   }
}

._kb-acc-active {
    background-image: url(https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-4ca47876-e2f6-493a-947d-78e514946fdd)!important;
}

._pendo-no-special-response_ {
    background-image: url(https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-17d7c75d-1a2e-42e0-a38e-274aff90835c);
    background-repeat: no-repeat;
    background-position: top 16px right;
    background-size: 16px;
   > a {
    padding-right: 20px!important;
    margin-right: 20px!important;
    border-bottom: 0px!important;
   }
}

._pendo-tt-suggestion_ {
    padding: 18px 0 16px;
    border-top: 2px solid #DCDCDC;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-decoration: none;
    list-style: none;
    scroll-margin-right: 20px;
    /* margin-bottom: 7px; */
    >a {
      display: list-item;
      text-decoration: none;
      margin: 0;
      padding: 0;
      font-size: 14px;
      color: #2e2e2e;
      cursor: pointer;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: normal;
      line-height: 14px;
      &:hover {
          text-decoration: underline;
          color: @search-results--link-hover-color;
      }
    }
}

div._pendo-suggestions-collapsible {
    font-size: 14px!important;
    color: #2e2e2e;
    white-space: pre-wrap;
    overflow: hidden;
    text-decoration: none;
    list-style: none;
    padding-left: 30px;
    line-height: 20px;
    padding-top: 14px;
}

._pendo-suggestions-learn-more {
    float: left;
}

._pendo-suggestions-learn-more, ._pendo-suggestions-view-in-hc {
    padding-top: 10px;
    text-align: right;
    >a {
        color: #007398;
        &:hover {
            color: #FF6c00;
        }
    }
}

._pendo-suggestion-vic-continue {
    background-color: #007398;
    padding: 10px;
    font-size: 20px;
    color: #ffffff;
    border: 2px solid #007398;
    &:hover {
        background-color: #FFFFFF;
        border-color: #FF6c00;
        color: #323232;
        >img {
            content: url(https://pendo.reaxys.com/7X0eN-xi2TYnlcI3kTQafnNZRC0/guide-media-17d7c75d-1a2e-42e0-a38e-274aff90835c)!important;
            height: 20px;
        }
    }
}

._pendo-suggestion-learn-more-button {
    font-size: 20px;
    padding: 10px;
    >img {
        width: 18px;
        height: 18px;
        vertical-align: bottom;
        padding-left: 5px;
        margin-bottom: -1px;
    }
}

._pendo-section-content-body-top-searches_,
._pendo-section-content-body-article_ {
    height: calc(~'100% - 6%');
    object-fit: contain;
}

._pendo-section-content-article_ {
    overflow-y: auto;
    padding: 0 15px;
}

._pendo-section-content-body-top-searches_,
._pendo-section-content-body-results_ {
    margin: 0px 0px 0px 20px;
    padding-right: 20px;
    overflow-x: auto;
    height: auto;
    line-height: 32px;
}

._pendo-section-content-body-results_ {
    height: auto;
    overflow-y: auto;
}

._pendo-launcher-search-results-list_ {
    margin: 0 30px 15px;
    overflow-y: auto;
    line-height: 32px;
}

._pendo-section-content-article-chevron_ {
  left: 0;
  top: 50%;
  margin-top: -5px;
  display: inline-block;
  width: 16px;
  height: 9px;
  background-image: url('data:image/svg+xml;utf,<svg width=\"256px\" height=\"448px\" viewBox=\"0 0 256 448\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"chevron-left\" fill=\"#000000\"><path d=\"M85.7,224 L85.7,224 L85.7,224 L252.9,49.9 C257.1,45.6 257,38.5 252.7,34.1 L222.8,3.5 C218.5,-0.9 211.5,-1 207.3,3.3 L3.1,215.9 C0.9,218.1 -0.1,221.1 0.1,224 C-5.32907052e-15,227 1,229.9 3.1,232.1 L207.3,444.8 C211.5,449.1 218.5,449 222.8,444.6 L252.7,414 C257,409.6 257.1,402.5 252.9,398.2 L85.7,224 L85.7,224 Z\" id=\"Shape\"></path></g></g></svg>');
  background-repeat: no-repeat;
  background-size: 12px 9px;
}

@supports (-moz-appearance:none) and (display:contents) {
  ._pendo-section-content-article-chevron_ {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -5px;
    display: inline-block;
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iNDQ4cHgiIHZpZXdCb3g9IjAgMCAyNTYgNDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjwvZGVmcz48ZyBpZD0iQ2hldnJvbnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik04NS42MjUsMjIzLjg2MzQ3IEw4NS42MjUsMjIzLjg2MzQ3IEw4NS42MjUsMjIzLjg2MzQ3IEwyNTIuODI1LDQ5Ljc2MzQ2OTggQzI1Ny4wMjUsNDUuNDYzNDY5OCAyNTYuOTI1LDM4LjM2MzQ2OTggMjUyLjYyNSwzMy45NjM0Njk4IEwyMjIuNzI1LDMuMzYzNDY5NzYgQzIxOC40MjUsLTEuMDM2NTMwMjQgMjExLjQyNSwtMS4xMzY1MzAyNCAyMDcuMjI1LDMuMTYzNDY5NzYgTDMuMDI1LDIxNS43NjM0NyBDMC44MjUsMjE3Ljk2MzQ3IC0wLjE3NSwyMjAuOTYzNDcgMC4wMjUsMjIzLjg2MzQ3IEMtMC4wNzUsMjI2Ljg2MzQ3IDAuOTI1LDIyOS43NjM0NyAzLjAyNSwyMzEuOTYzNDcgTDIwNy4yMjUsNDQ0LjY2MzQ3IEMyMTEuNDI1LDQ0OC45NjM0NyAyMTguNDI1LDQ0OC44NjM0NyAyMjIuNzI1LDQ0NC40NjM0NyBMMjUyLjYyNSw0MTMuODYzNDcgQzI1Ni45MjUsNDA5LjQ2MzQ3IDI1Ny4wMjUsNDAyLjM2MzQ3IDI1Mi44MjUsMzk4LjA2MzQ3IEw4NS42MjUsMjIzLjg2MzQ3IEw4NS42MjUsMjIzLjg2MzQ3IFoiIGlkPSJjaGV2cm9uLWxlZnQiIGZpbGw9IiMyY2EwYzgiPjwvcGF0aD48L2c+PC9zdmc+');
    background-size: 6px 10px;
    background-position: left;
  }
}

._pendo-launcher-search-results-container_ {
    line-height: 32px;

    ._pendo-launcher-search-results-section-header_ {
        margin: 0;
        padding: 0;
        font-weight: bold;
        font-size: 14px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            padding: 0;
        }
    }
}

&._pendo-launcher-searching_ {
    ._pendo-launcher-search-results_ {
        display: block;
    }

    ._pendo-launcher-menu_,
    ._pendo-launcher-body_ {
        display: none;
    }

    ._pendo-launcher-search-box_ ._pendo-launcher-clear-search-icon_ {
        display: block;
    }
    ._pendo-launcher-search-box_ ._pendo-launcher-clear-kb-search-icon_{
        display: block;
    }
}

._pendo-launcher-search-display_ {
    display: none;

    ._pendo-launcher-search-highlight_ {
        background-color: @search-results--search-highlight-color;
    }

    ._pendo-launcher-search-header_ h4 {
        margin: 8px auto 15px;
        font-weight: 700;
        font-size: 12px;
        color: #000000;
    }

    ._pendo-launcher-search-display-return_ {
        position: relative;

        >span {
            color: @search-results--search-display-return-color;
            vertical-align: middle;
            font-size: 14px;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &::before {
            content: '';
            width: 8px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
            background-position: center;
            background-size: 16px;
            background-repeat: no-repeat;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyY2EwYzgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tbGVmdCI+PHBvbHlsaW5lIHBvaW50cz0iMTUgMTggOSAxMiAxNSA2Ij48L3BvbHlsaW5lPjwvc3ZnPg==');
        }
    }
}

/* End search results */


/* Helpjuice - animation */
#_pendo-zendesk-kb_ ._pendo-launcher-article-loading_ ._pendo-spinner_ {
    top: 25%;
  }

  ._pendo-spinner_ {
    animation: rotator 1s linear infinite;
    height: 35px;
    width: 100%;
    position: absolute;
    top: 50%;
  }

  ._pendo-animated-circle_ {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    border-radius: 4px;
    animation: dash 1s ease-in-out infinite, colors 4s ease-in-out infinite;
  }


._pendo-launcher-search--is-displaying_ {
    ._pendo-launcher-search-results-header_,
    ._pendo-launcher-search-results-list_,
    ._pendo-launcher-menu_ {
        display: none;
    }
    ._pendo-launcher-search-display_ {
        display: block;
    }
}

/* if launcher search is enabled, adjust menu top */

._pendo-launcher-search-results_ + ._pendo-launcher-menu_ {
    top: @enableSearchTop;
}


a._pendo-article-link_._pendo-external-link_ {
    padding-left: 25px;
    white-space: nowrap;
    margin-bottom: 10px;
    text-overflow: ellipsis;
}

button._pendo-external-link_ {
    display: block;
    position: relative;
    font-weight: 400;
    float: right;
    :focus {
        outline: none;
    }
}

._pendo-external-link_ svg{
    height: 19px;
    float: right;
    cursor: pointer;
    border: 0;
    padding: 0;
    clear: both;
    color: #000000;
    background: none;
    padding-left: 4px;
    :focus {
        outline: none;
    }
}

._pendo-external-link_ a:hover{
    color: @search-results--link-hover-color;
}

._pendo-section-content-article-breadcrumbs_ {
    line-height: 0px;
    text-overflow: ellipsis;
    margin: 0px;
    > ._pendo-article-breadcrumbs-title_ {
        color: #000000;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
    > h4 {
        display: inline-block;
        line-height: 32px;
        font-weight: 700;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 90%;
        margin: 0;
    }
}

._pendo-article-nav_ {
    font-size: 14px;
    line-height: 32px;
    margin-top: 0px;
    color: #000000;
    ._pendo-back-to-results_ {
        height: 32px;
        color: #2e2e2e;
        padding: 0;
        border: 0;
        cursor: pointer;
        svg {
            vertical-align: sub;
        }
        span {
            margin: 0px 0px 0px -4px;
        }
    }
    ._pendo-back-to-results_:hover {
        color: @search-results--link-hover-color;
    }
}

._pendo-article-content_ {
    overflow-y: auto;
    height: 100%;
}

._pendo-article-content-main_ {
  background-color: #ffffff;
  border-radius: 0px;
  padding: 0px 5px 0px;
  overflow-x: hidden;
  max-width: 100%;
  position: relative;
  cursor: default;
  line-height: 24px;
  font-size: 16px;
  text-size-adjust: 100%;
  &:first-child {
    margin-top: 0;
  }
  .expandable {
    cursor: zoom-in;
  }
  a {
    color: #007398!important;
  }
  a:hover {
    color: @search-results--link-hover-color!important;
  }
  p {
      font-size: unset!important;
      line-height: unset!important;
      background: unset!important;
      color: #505050;
      margin: 0 0 10px;
    img {
      margin: 0;
      width: 100%;
    }
  }
  h1, h2, h3 {
    line-height: 1.2;
    white-space: normal;
    font-weight: 700;
    color: #505050 !important;
    background: unset!important;
    span {
        color: #505050 !important;
    }
  }
  h1 {
    font-size: 28px;
    margin: .85763em 0;
  }
  h2 {
    font-size: 1.521em;
    margin: 0 0 .98619em;
  }
  h3 {
    font-size: 1.322em;
  }
  h4 {
    font-size: 1.15em;
    color: #000000 !important;
  }
  h5 {
    font-size: .87em;
    color: #000000;
  }
  h6, small {
    font-size: .756em;
  }
  blockquote {
    padding: 0px 20px 0px 20px;
    margin: 20px 0;
    font-size: 16px;
    border-left: 5px solid #2F3545;
    color: #000000;
    a {
      font-size: 16px;
      color: #000000;
    }
    a:hover {
        color: @search-results--link-hover-color;
    }
    footer {
      display: block;
      font-size: 80%;
      line-height: 1.42857;
      color: rgba(0, 0, 0, 0.8);
      &::before {
        content: '— &nbsp;';
      }
    }
    small {
      display: block;
      font-size: 80%;
      line-height: 1.42857;
      color: rgba(0, 0, 0, 0.8);
      &::before {
        content: '— &nbsp;';
      }
    }
  }

  img {
    display: block;
    max-width: 100%;
    height: auto !important;
    width: auto !important;
  }

  table {
    /*transform: scale(0.95, 0.95) !important;*/
  }

  table, thead, tbody, tfoot, tr, th, td {
    max-width: 100%;
    margin-top: 10px;
    padding: 0px;
    border: 1px solid rgb(128, 128, 128);
    font-size: 16px;
    line-height: 24px;
    width: auto !important;
    vertical-align: middle !important;
    color: #505050;
    h2 {
        font-size: 18px !important;
    }
    p {
        font-size: 16px !important;
        color: #505050;
    }
    img {
        padding: 5px !important;
    }
  }
  tr {
    margin-bottom: 10px;
  }
  tr:nth-child(even) {
    background-image: linear-gradient(0, rgba(0,0,0,0.07),rgba(0,0,0,0.07));
  }
  td {
      padding: 5px !important;
      color: #505050
  }
  dl {
    margin-top: 0;
    margin-bottom: 20px;
  }
  span {
    font-size: 14px!important;
    color: #505050;
  }
  img {
    width: 100%;
  }
  ol, ul {
    padding-inline-start: 10px;
    color: #505050
  }
  ul > li {
      list-style-type: disc;
      margin-left: 15px !important;
      background: unset!important;
      color: #505050;
  }
  ol > li {
      list-style-type: decimal;
      margin-left: 15px !important;
      background: unset!important;
      color: #505050;
  }
}

._pendo-zoom-overlay_ {
    /* The Modal (background) */
    position: fixed; /* Stay in place */
    z-index: 999999; /* Sit on top */
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
    transition: all 300ms ease 0s;
    cursor: zoom-out;

    ._pendo-zoom-container_ {
        transition: all 300ms ease 0s;
        z-index: 9999999;

        /* Modal Content (Image) */
        ._pendo-zoom-content_ {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
            animation-name: pendo-zoom;
            animation-duration: 0.3s;
        }
    }
}


._pendo-section-content-suggestions-empty_ {
    text-align: center;
    margin: 50px 0;
    h4 {
        font-size: 16px;
        font-weight: 400;
        color: #000000;
    }
}

._pendo-launcher-section-body_ {
    height: calc(100% - 6%);
    overflow-y: auto;
}

._pendo-kb-search_ {
    overflow-y: hidden !important;
}



@keyframes pendo-ext-spin {
    0% {
        opacity: 1;
        transform: rotate(0deg);
    }

    to {
        opacity: 1;
        transform: rotate(1turn);
    }
}

@keyframes pendo-zoom {
    from {transform:scale(0)}
    to {transform:scale(1)}
  }

._pendo-resource-center-sandbox-module-code-container {
    border-style: none!important;
}

/* This is Elsevier-specific CSS that constructs the loading wheel. */

.es-progress-indicator {
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  position: relative;
  padding-top: 40px;
}

.es-progress-indicator:before {
  bottom: 0;
  color: #0C7DBB;
  content: attr(aria-valuenow) '%';
  height: 1em;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
}

/* Hide progress percentage when none available */
.es-progress-indicator:not([aria-valuenow]):before {
  display: none;
}

.es-progress-indicator > div {
  border-radius: 50%;
  border-style: solid;
  border-width: 4px;
  display: block;
  height: 48px;
  width: 48px;
  border-color: #EBEBEB #EBEBEB #EB6500 #EB6500;

  animation: es-progress-indicator-rotate 5s linear 120;
}

/* Stop animation and change color when 100% progress */
.es-progress-indicator[aria-valuenow="100"] > div {
  animation: none;
  border-color: #0C7DBB;
}


/* Small, don't show percentage and reduce size */
.es-progress-indicator.small:before {
  content: none;
}
.es-progress-indicator.small > div {
  border-width: 2px;
  height: 16px;
  width: 16px;
}

@keyframes es-progress-indicator-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.es-progress-indicator-wrapper {
    text-align: center;
    margin: 0 auto;
}
