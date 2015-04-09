var $readerBtn = $('<div class="zm-reader-btn">阅读</div>')
  , $page = $('<div class="pager"><div class="page"></div></div>')

$('body').on('click', '.zm-reader-btn', function() {
  var e = $(this)
    , $title = $('<h1></h1>').text(e.parents('.content').find('h2').find('a').text())
    , $more = e.parent().find('.zh-summary')
    , content = $more.length ?
                e.parent().find('.zm-editable-content').html() :
                ''

  $more.trigger('click')
  e.parents('.content').find('.collapse')[0].click()

  content = e.parent().find('.zm-editable-content').html()

  $page.find('.page').html(content).prepend($title)

  $page.show()

  $('body').addClass('bodyon')
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
  if ($('.question-page').length) return
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
