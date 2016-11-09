import wxService from '../services/wx'
import getClassListModel from '../models/get_class_list'
import getAcademyListModel from '../models/get_academy_list'
export default async (ctx, next) => {
    const wxServiceObj = new wxService('wx81a4a4b77ec98ff4', ctx)

    if (!ctx.session.openidObj) {
        const openidObj = await wxServiceObj.getOpenid.call(wxServiceObj)

        if (!openidObj) 
            return false 
        ctx.session.openidObj = JSON.stringify(openidObj)
    }

    const acadList = await getAcademyListModel()
    const classList = await Promise.all(acadList.map((item) => {
        return getClassListModel(item.id)
    }))
    
    await ctx.render('index.ejs', {
        classList,
        jssdk: await wxServiceObj.getJsSdk.call(wxServiceObj)
    })
}
