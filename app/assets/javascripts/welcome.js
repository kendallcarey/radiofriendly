$(document).ready(function(){
  ytplayer = new Youtube.Controller;
  ytplayer.bindListeners();
})

Youtube.Controller = function(){
  var self = this

  this.bindListeners = function(){
    this.searchFirstSongListener();
  }

  this.createPlayer = function(videoId){
    var params = { allowScriptAccess: "always" };
      atts = { id: "myytplayer" };
      settings = "?enablejsapi=1&playerapiid=ytplayer&version=3"
      video_id = videoId
      and = "&"
      autoplay = "autoplay=1"
      controls = "controls=0"
      info = "showinfo=0"

    swfobject.embedSWF("http://www.youtube.com/v/"+video_id+
                      settings+and+autoplay+and+controls+and+info,
                      "ytapiplayer", "100%", "356", "8",
                      null, null, params, atts);
  }

  this.searchFirstSongListener = function(){
    $('#search_first_song').on('submit', function(e){
      e.preventDefault();
      self.searchFirstSong($(this));
    })
  }


  this.searchFirstSong = function(form){
    var url = form.attr("action")
        searchQuery = form.find('input').first().val()
    $.ajax({
      url: url,
      type: "POST",
      data: {search: searchQuery}
    }).done(function(response){
      $('#search-results').remove()
      $('#search_first_song').append(response)
      $('#search_first_song').find('input').first().val("")
      if($('#myytplayer').length==1){
        self.clickSongListener();
      }

    })
  }

  this.clickSongListener = function(){
    $('.video-container').on('click', function(e){
      e.preventDefault();
      self.clickSong($(this));
    })
  }

  this.clickSong = function(container){
    var parameters = container.parent().attr('href').split('?')
        url = $('#search_first_song').attr('action')
        videoId = parameters[1].split('=')[1]
    $.ajax({
      url: url,
      type: "POST",
      data: {addVideo: videoId}
    }).done(function(response){
      $('#search-results').remove()
      $('#search_first_song').append(response)
      $('#added_message').fadeOut(3000)
    })

  }

}