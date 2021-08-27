// location.reload();

var start = 0;
var counter = 0;
var end = 0;
var signal = false;
var done = false;
var track_for_page_change;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log(sender.tab ?
        //         "from a content script:" + sender.tab.url :
        //         "from the extension");

        if (request.go == "true"){
            start = parseInt(request.start);
            end = parseInt(request.end);
            counter = start;

            just_start();
            sendResponse({farewell: "goodbye"});
        }

        return true;
});

const doing_work = () => {

    if(done){
        clearInterval(scroll_to_btm);
        clearInterval(doing_work);
        return;
    }

    if (counter > end && signal === true) {
        signal = false;
        done = true;
        clearInterval(doing_work);
        clearInterval(scroll_to_btm);
        alert("Done");
        return;
    }

    if(signal){

        if(counter <= end){

            track_for_page_change = true;
    
            let name_tags = document.getElementsByClassName('entity-result__title-text');

            try {
                if(!done)  {
                    document.getElementsByClassName('artdeco-pagination__button--next')[0].click(); 
                }
            } catch (error) {
                track_for_page_change = false;
            }

            if(track_for_page_change){
                counter++;

                var profile = [];

                for(let i=0; i<name_tags.length; i++){
                    profile.push(name_tags[i].firstElementChild.firstElementChild.firstElementChild.innerText);
                }

                for(let a=0; a<profile.length; a++){
                    console.log(profile[a]);
                }

                console.log("\n");
                signal = false;
            }

            if(start < end && counter < end){
                if(!done){
                    setInterval(scroll_to_btm, 500);
                }
            }else{
                clearInterval(scroll_to_btm);
            }
                
        }
    }
};

const scroll_to_btm = () => {
    
    if(!done){
        window.scrollTo(0, document.body.scrollHeight);
    }

    if(done){
        clearInterval(doing_work);
        clearInterval(scroll_to_btm);
        return;
    }


    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && done === false) {
        signal = true;

        clearInterval(scroll_to_btm);

        if(start < end && counter < end){
            setInterval(doing_work, 500);
        }else{
            clearInterval(doing_work);
            clearInterval(scroll_to_btm);
        }
    }

};

function just_start(){

    do {
        if(!done){
            window.scrollTo(0, document.body.scrollHeight);
        }

        var current_page = document.getElementsByClassName("artdeco-pagination__indicator--number active");
        var pages = document.getElementsByClassName("artdeco-pagination__indicator--number");

        if(String(current_page[0].innerText) !== String(start)){
            for(let t=0; t<pages.length; t++){
                if(String(pages[t].innerText) === String(start)){
                    pages[t].firstElementChild.click();
                    good_to_go = true;
                }
            }
        }
    } while (false);

    if(parseInt(start) <= parseInt(end) && !done){
        setInterval(scroll_to_btm, 500);
    }else{
        alert("Please Enter valid starting and ending page !!!");
    }
};