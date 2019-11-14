import * as aT from "../utils/actionTypes";

const update = (prevState, newState) => ({ ...prevState, ...newState });
// crawl_status = "success" || "err" || "wait"

const indexOfFirstPending = ({articles }) => {
    for(let i=0 ; i< articles.length; i++){
        if(articles[i].crawl_status === 'wait' ){
            return i;
        }
    }
    return articles.length;
}
const dummy = [
    {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        image: [
            "https://miro.medium.com/max/1200/1*tMOJBSqKfYd9M2zOskluFw.png"
        ],
        url: "https://medium.com/free-code-camp/5-key-learnings-from-the-post-bootcamp-job-search-9a07468d2331",
        dateCreated: "2016-11-19T16:48:30.365Z",
        datePublished: "2016-11-19T16:48:30.365Z",
        dateModified: "2019-01-21T06:33:37.909Z",
        headline: "[DUMMY]: I spent 3 months applying to jobs after a coding bootcamp. Here’s what I learned.",
        name: "I spent 3 months applying to jobs after a coding bootcamp. Here’s what I learned.",
        description: "A less-talked about part of the bootcamper’s journey is what happens after you graduate — when you’re searching for that six-figure developer position. I completed Hack Reactor in July 2016 and took…",
        identifier: "9a07468d2331",
        keywords: [
            "Tech",
            "Startup",
            "Programming",
            "Self Improvement",
            "Life Lessons"
        ],
        author: {
            "@type": "Person",
            name: "Felix Feng",
            url: "https://medium.com/@felixfeng"
        },
        creator: [
            "Felix Feng"
        ],
        publisher: {
            "@type": "Organization",
            name: "freeCodeCamp.org",
            url: "https://medium.com/free-code-camp",
            logo: {
                "@type": "ImageObject",
                width: 500,
                height: 60,
                url: "https://miro.medium.com/max/500/1*wViBNJ1o9rM5p6b-gf3vxg.png"
            }
        },
        mainEntityOfPage: "https://medium.com/free-code-camp/5-key-learnings-from-the-post-bootcamp-job-search-9a07468d2331",
        blog: "I spent 3 months applying to jobs after a coding bootcamp. Here’s what I learned.Felix FengFollowNov 19, 2016 · 6 min readA less-talked about part of the bootcamper’s journey is what happens after you graduate — when you’re searching for that six-figure developer position.< 3% of applications became offersI completed Hack Reactor in July 2016 and took almost 3 months before accepting an offer with Radius Intelligence. I applied to 291 companies, did 32 phone screens, 16 technical screens, 13 coding challenges, 11 on-sites, and received 8 offers. The offers ranged from $60-125k in salary from companies all over the US, and for both front end and full stack roles. In total, 2.8% of applications became offers.Here are 5 things I wish I’d known before I began my job search.Insight #1: Get through to real peopleAt first, I applied for companies using the shotgun approach. I applied through Indeed.com, AngelList, LinkedIn, StackOverflow, Hacker News, company websites, and even Craigslist.I’d submit a resume for any role that wanted React, Node, or JavaScript experience. In the first week, I applied to 15–20 companies a day.Pro-Tip: Find companies using this easy-application repo.My yield was low. Less than five percent of companies responded to me. I was throwing applications into a black hole.Everything changed when one of my cohort-mates, a former recruiter, shared a guide to the job search. He told us to send emails directly to real people with each application. It could be anybody. As long as someone read it.From then on, whenever I submitted an application, I searched for the company on LinkedIn and emailed someone on their engineering or hiring team.For most small companies or C-level executives, the email format is usually firstName@dreamCompany.com. For larger companies, it may be firstName.lastName@dreamCompany.com.To verify emails, I used Rapportive to cross-check emails with social media accounts.The results were amazing. With 150+ emails sent, my response rate was a whopping 22%.It also felt great to hear from real people. Surprisingly, CEOs and CTOs responded to me. Sometimes they even interviewed me themselves.Takeaway: If you’re applying through the front door, make sure you’re getting to human beings.Insight #2: Start small and work your way upYou will face Level 1 interviews (a non-tech company that needs any dev), where interviewers ask you nothing more than JavaScript trivia.You will face Level 9 interviews (Google/Facebook level), where interviewers ask difficult data structure and algorithm questions.I strategically set up my process so that I had lower-level interviews earlier, and higher-level interviews later on.Early on, I gained experience, built confidence, and secured offers from companies that had less intensive interviews.As I got more experience, I effectively “leveled up.” I became capable of completing interviews at companies with higher hiring bars. This is illustrated below as a linear correlation between the number of weeks I was into the process and the base salary I was offered.There’s a direct correlation between time spent interviewing and offer salary.I unlocked tougher questions. I unlocked higher salaries. And eventually, I unlocked the job I took.Takeaway: Plan to tackle easier interviews early on and more difficult ones later on.Insight #3: Study like your future job depends on it (because it does)I hate to break it to you, but the most important thing you could be doing at any point is studying and preparing.Why? Because you won’t get the offer if you don’t have good answers to the questions they ask you.People won’t refer you if they don’t think you’re prepared for their interviews.Coming out of Hack Reactor, my weaknesses were data structures and algorithms. A study by Triplebyte has found that bootcamp grads are weaker in these areas than computer science grads.So I learned and practiced. Every day.I devoted entire days to learning sorting algorithms. Other days, I focused on understanding how the internet worked.If I didn’t fully understand a concept, I’d spend the day watching YouTube videos or searching StackOverflow until I did.I found the following study materials useful:InterviewCake: My favorite resource for data structures and algorithms. It breaks down solutions into step-by-step chunks — a great alternative to Cracking the Code Interview (CTCI). My only gripe is that they don’t have more problems!HiredInTech’s System Design Section: A great guide for system design interview questions.Coderust: If you’re avoiding CTCI like the plague, Coderust 2.0 may be perfect for you. For $49, you get solutions in almost any programming language, with interactive diagrams.Reddit’s How to Prepare for Tech Interviews: I constantly used this as a benchmark for how prepared I was.Front End Interview Questions: An exhaustive list of front-end questions.Leetcode: The go-to resource for algorithm and data structure questions. You can filter by company, so for example, you could get all the questions that Uber or Google typically ask.Takeaway: There’s no such thing as too much preparation.Insight #4: Put your best foot forwardBreaking into the industry is hard. You have to perform well, even when you’re not fully prepared. In order to succeed, you have to be your own advocate.Sell YourselfAt Hack Reactor, we’re trained to mask our inexperience. In our personal narratives, we purposely omit our bootcamp education.Why? Otherwise, companies automatically categorize us into junior developer roles or tag us as “not enough experience.”In one interview with a startup, the interview immediately went south once they realized I’d done a bootcamp. One company used it against me and made me a $60k offer, benchmarking against junior developers.Ultimately, you need to convince companies that you can do the job.At the same time, you need to convince yourself that you can do the job.You can. Focus on your love for programming. Focus on what you’ve built with React and Node. Focus on demonstrating your deep knowledge in JavaScript and any other languages you’ve learned.Only then can they justify giving you the job.It’s a Two-way ConversationInterviewing is a mutual exploration of fit between an employee and an employer. While it’s your job to convince employers to hire you, it’s also their job to win you over.Don’t be ashamed of using the interview as an opportunity to evaluate the job opportunity.I talked to any company, even if I had only the slightest interest.I did on-sites all over the country with any company that invited me out. I asked questions, and sucked up knowledge on engineering team organization, technologies and tools used, company challenges, and system architecture.Pro-Tip: During interviews, ask the following questions:What are some technical challenges you’ve recently faced?What do you enjoy about working at X company?How are teams structured and how are tasks usually divided?I treated every interaction as a learning opportunity. Each interaction helped me improve my presentation, interview, and technical skills. Each failure helped me find my blind spots.Takeaway: Don’t sell yourself short! And remember, it’s a mutual exploration.Insight #5: It’s a marathon, not a sprintThe journey is by no means easy. For 3 months, I grinded 6 days a week. But I tried to take care of myself.What a typical day could look like in JavaScriptSome days, I’d study with friends. Other days, I’d go find a cafe and study alone, or hang out at Hack Reactor’s alumni lounge. And every week I’d check in with our career counselor to talk about my progress.It’s easy to burn out during the process. Eat well, sleep, and exercise.It can get lonely. Spend time with friends who are going through the same experience.Takeaway: Prepare for the long game and make sure you take care of yourself.In summary, the key takeaways are:Get through to real peopleStart small and work your way upStudy like your future job depends on itPut your best foot forwardIt’s a marathon, not a sprintThe process may seem endless, but you’re going to make it. Keep putting in the hours. Keep sending in the applications. Keep taking caring of yourself. All of it pays off in the end.A special thanks to Dylan Tran, Karen Zhao, Rohit 'Sunny' Rekhi, Jake Pace, Anamita Guha, Stephanie Liu, and many others.Please share this with friends going through the job search. If you like what you read, hit that ❤ button below.",
        fetch_time: 6684,
        crawl_status : 'success'  
    }
]

const initialState = {
    input_tag: '',  // look for tag
    available_tags: [],
    articles: dummy,
    primary_tag: '',
    filter: {
        word: '',
        tags: '',
        headline: '',
        author: '',
        publisher: '',
        identifier: ''
    },
    filtered_articles : [],
    show_filtered : false
}


const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case aT.SET_INPUT_TAGS: return update(state, { input_tag: action.data.value }); break;

        case aT.SET_AVAILABLE_TAGS: return update(state, { available_tags: [...action.data] }); break;

        case aT.SET_PRIMARY_TAG: return update(state, { primary_tag: action.data.tag }); break;

        case aT.PUSH_ARTICLE: {
            const newState = Object.assign({}, state);

            switch(action.data.crawl_status){
                case "success" : {
                    const index = indexOfFirstPending({articles : state.articles});
                    let new_articles = [...state.articles];
                    new_articles[index] = {...action.data};
                    newState.articles = new_articles;
                }break;
                case "err" : {
                    const index = indexOfFirstPending({articles : state.articles});
                    let new_articles = [...state.articles];
                    new_articles[index] = {...action.data};
                    newState.articles = new_articles;
                }break;
                case "wait" : {
                    const new_articles = [...newState.articles, { ...action.data }];
                    newState.articles = new_articles;
                }break;
            }
            return newState;
        }break;

        case aT.SET_ARTICLES: return update(state, {articles : [...action.data] }) ;break;

        case aT.SET_FILTER_INPUT : {
            const newState = Object.assign({}, state);
            const newFilter = Object.assign({}, newState.filter);
            newFilter[action.data.key] = action.data.value
            newState.filter = newFilter;
            return newState;
        }break;

        case aT.SET_SHOW_FILTERED : return update(state, {show_filtered : action.data }); break;

        case aT.SET_FILTERED_ARTICLES : return update(state, {filtered_articles : [...action.data]}); break;
        
        default: return state;
    }
}

export default articleReducer;