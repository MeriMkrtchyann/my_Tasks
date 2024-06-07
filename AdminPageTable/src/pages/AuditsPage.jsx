import { useEffect } from "react"
import { getData } from "../api/getData"
import { urls } from "../config/urls"
import { useDispatch } from "react-redux"
import { updateAuditsInfo } from "../../redux/slices/audits/auditsSlice"

const AuditsPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
       (async () => {
        const audits = await getData(urls.audits)
        dispatch(updateAuditsInfo(audits));
        console.log()
        console.log(audits)
       })()
    },[])

    return (
        <div>
            AuditsPage
        </div>
    )
}

export { AuditsPage } 