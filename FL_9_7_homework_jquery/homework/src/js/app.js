const btnViewMore = `<button class="btn btn-view-more">View more</button>`;
const picNumInBox = 3;
let counter = 0;

$.getJSON('data/media.json', function(data) {
  generateGrid(4, data);

  $('.pic').on('click', displayModal);
  $('.pic').hover(function() {
        $(this.lastChild).show();
      }, function() {
        $(this.lastChild).hide();
      },
  );
  $('#container').append(btnViewMore);
  $('.btn-view-more').on('click', handleClick);
});

function addFigureBox(pic1Id, pic2Id, pic3Id, data) {
  $('#container').append(`
  <div class="container-box">
    <figure class="pic" id=${data.media[pic1Id].id}><img src="${data.media[pic1Id].display_url}">
        <div class="hover-img" id="${pic1Id}"><p>${data.media[pic1Id].edge_liked_by.count}</p>
            <p>${data.media[pic1Id].edge_media_to_comment.count}</p></div>
    </figure>
    <figure class="pic" id=${data.media[pic2Id].id}><img src="${data.media[pic2Id].display_url}">
        <div class="hover-img" id="${pic2Id}"><p>${data.media[pic2Id].edge_liked_by.count}</p>
            <p>${data.media[pic2Id].edge_media_to_comment.count}</p></div>
    </figure>
    <figure class="pic" id=${data.media[pic3Id].id}><img src="${data.media[pic3Id].display_url}">
        <div class="hover-img" id="${pic3Id}"><p>${data.media[pic3Id].edge_liked_by.count}</p>
            <p>${data.media[pic3Id].edge_media_to_comment.count}</p></div>
    </figure>
</div>`);
}

function handleClick() {
  $('.btn-view-more').hide();
  $.getJSON('data/media.json', function(data) {
    generateGrid(2, data);
    $('.pic').off('click', displayModal).on('click', displayModal);
  });
}

function displayModal(event) {
  const id = $(event.target).parent().attr('id');
  $('.modal').show();
  $('.overlay').show();
  displayInfo(id);
}

function showNext() {
  const id = $(this).data('id');
  if (id < 0 || id > 17) {
    return;
  }
  $('.modal').empty();
  displayInfo(id);
}

function generateGrid(boxNum, data) {
  for (let i = 0; i < boxNum; i++) {
    addFigureBox(counter, counter + 1, counter + 2, data);
    counter += picNumInBox;
  }
}

function exit() {
  $('.modal').empty().hide();
  $('.overlay').empty().hide();
}

function displayInfo(id) {
  $.getJSON('data/media.json', function(data) {

    const item = data.media[id];

    $('.modal').append(`<button class="btn btn-prev" data-id ="${id - 1}"></button>
        <button class="btn btn-next" data-id ="${parseInt(id) + 1}"></button>`);
    $('.modal').
        append(`<figure class="pic"><img src="${item.display_url}"></figure>`);
    $('.modal').append(
        `<article class="post-info">

        <div class="post-box">
            <div class="post-header">
                <div class="post-avatar">
                    <img src="picture/user.jpg" alt="avatar">
                </div>
                <div class="post-header-info">
                    <div class="post-header-info-author">
                        <h2>${data.username}</h2>
                        <a href="#" class="post-header-link">Follow</a>
                    </div>
                </div>
            </div>
            <hr>
            <p><strong>${data.username}</strong> <span class="post-description">${item.edge_media_to_caption}</span></p>
        </div>

        <div class="post-box">
            <p>${item.edge_liked_by.count} likes</p>
            <hr>
            <p class="post-comment"> Add a comment...</p>
        </div>
    </article>`);

    $('.overlay').append(`<div class="btn btn-exit">
    <div class="btn-exit-left"></div>
    <div class="btn-exit-right"></div>
    </div>`);

    const text = $('.post-description').text()
    .replace(/\#.\S*/gi, '<span>' + '$&' + '</span>')
    .replace(/\@.\S*/gi, '<span>$&</span>');
    $('.post-description').html(text);

    if (item.location) {
      $('.post-header-info').append(`<p>${item.location}</p>`);
    }

    $('.btn-next').on('click', showNext);
    $('.btn-prev').on('click', showNext);
    $('.btn-exit').on('click', exit);
  });
}