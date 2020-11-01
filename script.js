let keyStorage = 'current-watched';
if (localStorage.getItem(keyStorage)) {
  let current = parseInt(localStorage.getItem(keyStorage));
  if (current >= 0) {
    let movie = dataPlaylist[current];
    $('#current-watched').text(movie.title);
    if (current < dataPlaylist.length - 1) {
      setTimeout(() => $('.watch-next').css('opacity', 1), 1000);
    }
  }
}
$('#list-episode').html('');
for (let i = 0; i < dataPlaylist.length; i++) {
  $('#list-episode').append(`
    <button class="btn btn-info btn-sm mr-1" onclick="currentWatched(${i})">${i + 1}</button>
  `);
}

let currentWatched = (index) => {
  let movie = dataPlaylist[index];
  let title = movie.title;
  let url = movie.url;
  $('#current-watched').text(title);
  localStorage.setItem(keyStorage, index);
  if (index >= 0) {
    let movie = dataPlaylist[index];
    $('#current-watched').text(movie.title);
    if (index < dataPlaylist.length - 1) {
      setTimeout(() => $('.watch-next').css('opacity', 1), 1000);
    }
  }
  window.open(url, '_blank');
}

let watchNext = () => {
  let current = parseInt(localStorage.getItem(keyStorage));
  if(!isNaN(current) && current >= 0 && current < dataPlaylist.length - 1){
    currentWatched(current + 1);
  }
}


async function download(url) {
  let embed = url;
  let getHtmlValue = await getHtml(embed);
  bookmarklet(embed, getHtmlValue);
}

async function getHtml(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

$('#watching').on('hidden.bs.modal', function (e) {
  $('#iframe-view').attr('src','');
})
// document.getElementById('video-embed').contentWindow.bookmarklet();