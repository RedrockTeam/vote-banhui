import wxService from '../services/wx'
export default async (ctx, next) => {
  const title = '班徽投票'

  if (!this.session.openid) {
      const wxServiceObj = new wxService('wx81a4a4b77ec98ff4', ctx)
      const openidObj = await wxServiceObj.getOpenid.call(wxServiceObj)
      this.session.openid = openidObj
  }

  await ctx.render('index', {
    title
  })
}
