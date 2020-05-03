function getAllCourses() {
    $.get( "/v1/courses", function( data ) {
        $( ".result" ).text( data[0].level );
        alert( "Load was performed." );
    });
}

$('.load-courses').click(() => {getAllCourses()});