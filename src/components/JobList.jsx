import Filter from "./Filter"
import data from '../assets/data.json'
import {useState , useEffect} from 'react'


function JobList() {

    const [jsonData, setJsonData] = useState([])
    const [filters, setFilters] = useState([])
    useEffect(() => {
        setJsonData(data)
    }, [])

    const filterFunc = ({role, level, languages, tools}) => {
        const tags =[role, level];

        if(filters.length === 0){
            return true;
        }

        if(tools) {
            tags.push(...tools)
        }

        if(languages) {
            tags.push(...languages)
        }

        return tags.some(tag => filters.includes(tag))
    }

    const handleTagClick = (tag) => {
        setFilters([...filters, tag])
    }


    const filteredJobs = jsonData.filter(filterFunc)

  return (
    <div className="jobs">
        <Filter />
        {jsonData.length === 0 ?
        (
            <p>Jobs are fetching ...</p>
        ) : 
        (
            filteredJobs.map((i) => 
            <main className={`card shadow-md ${i.featured && 'card--border'}`} key={i.id}>
            <section className="card--wrapper">
                <div className="card--img">
                    <img src={i.logo} alt={i.company} />
                </div>
                <div className='card--content'>
                    <div className="card--company">
                        {i.company}
                        <div className="card--company-feat">
                            {i.new && <span className="new">NEW!</span>}
                            {i.featured && <span className="featured">FEATURED</span>}
                        </div>
                    </div>
                    <div className="card--position">
                        {i.position}
                    </div>
                    <div className="card--items">
                        {i.postedAt} · {i.contract} · {i.location}
                    </div>
                </div>
            </section>
            <hr />
            <section className="card--filter">
                <span onClick={() => handleTagClick(i.role)}>{i.role}</span>
                <span onClick={() => handleTagClick(i.level)}>{i.level}</span>
                {i.languages ? (
                    i.languages.map((x,ind) => <span onClick={() => handleTagClick(x)} key={ind}>{x}</span>)
                ): ''}
                {i.tools ? (
                    i.tools.map((z,ind) => <span onClick={() => handleTagClick(z)} key={ind}>{z}</span>)
                ): ''}
            </section>
        </main>) 
        )}
    </div>
  )
}

export default JobList