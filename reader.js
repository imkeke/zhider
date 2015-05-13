String.prototype.hashCode = function() {
  var hash = 0, i, chr, len
  if (this.length == 0) return hash
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i)
    hash  = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash
}

var $readerBtn = $('<div class="zm-reader-btn">阅读</div>')
  , $page = $('<div class="pager"><div class="page"></div></div>')

$('body').on('click', '.zm-reader-btn', function() {
  var e = $(this)
    , $title = $('<h1></h1>').text(e.parents('.content').find('h2').find('a').text())
    , $more = e.parent().find('.zh-summary')
    , $hash = $more.length ? $more.text() : ''
    , content = $more.length ?
                e.parent().find('.zm-editable-content').html() :
                ''

  $more.trigger('click')
  e.parents('.content').find('.collapse')[0].click()

  content = e.parent().find('.zm-editable-content').html()

  $page.find('.page').html(content).prepend($title)

  $page.show()

  if ($hash.hashCode() != $page.attr('data-hash')) {
    $page.scrollTop(0)
  }

  $page.attr('data-hash', $hash.hashCode())

  $('body').addClass('bodyon')
}).on('click', function(event) {
  var e = $(event.target)
    , isShow

  if (e.hasClass('zh-summary')) {
    isShow = e[0].style.display == 'none'
    if (isShow) {
      console.log(e.parents('.entry-body'))
      e.parents('.entry-body').find('.zm-reader-btn').addClass('expand')
    }
  }

  if (e.hasClass('collapse')) {
    e.parents('.entry-body').find('.zm-reader-btn').removeClass('expand')
  }

})

$page.on('click', function(event) {
  var e = $(this)

  if ($(event.target).is('.pager')) {
    e.find('.page').empty()
    e.hide()
    $('body').removeClass('bodyon')
  }
})

function setBtn() {
  var isHome = $('#zh-top-home-link').hasClass('current')
  if (!isHome) return

  $('.zm-votebar:not(.zm-votebar-already)')
  .after($readerBtn).addClass('zm-votebar-already')
}
setBtn()

var defaultFeedLength = $('#js-home-feed-list .feed-item').length
  , feedLength

setInterval(function() {
  feedLength = $('#js-home-feed-list .feed-item').length
  if (feedLength > defaultFeedLength) {
      setBtn()
      defaultFeedLength = feedLength
  }
}, 1000)

$('body').append($page)
