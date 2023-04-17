const express = require("express")
const router = express.Router()
const Posts = require("../schemas/posts.js")

//1. 게시글 작성 api
router.post("/posts", async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { user, password, title, content, createdAt } = req.body
    console.log(req.body)
    // 클라이언트가 요청한 데이터가 없을 때
    if ((!user || !password || !title || !content) || null) {
        res.status(400).json({ message: "요청한 데이터가 없습니다." })
        return
    }
    try {
        //몽고db에 생성할 스키마
        const createdPosts = await Posts.create({ user, password, title, createdAt, content })
        res.status(200).json({ "message": "게시글을 생성하였습니다." })
    } catch (error) {
        // 에러 처리
        res.status(500).json(`{ ${error}, message: "서버 에러가 발생했습니다." }`)
    }
})


//2. 게시글 조회 api
router.get('/posts', async (req, res) => {
    const _data = await Posts.find({})
    //_id => postId
    const data = _data.map((item) => {
        return {
            postId: item._id,
            user: item.user,
            password: item.password,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            _id: undefined
        };
    });

    res.json({ data })
})



//3. 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    let _data = await Posts.find({})
    //_id => postId
    let data = _data.map((item) => {
        return {
            postId: item._id,
            user: item.user,
            password: item.password,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            _id: undefined
        };
    });
    try {
        const [result] = data.filter((item) => _postId === String(item.postId))
        res.status(200).json({ "data": result })
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
    }
})

// 4. 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    const { password, title, content } = req.body
    let post = await Posts.findOne({ _id: _postId })

    if (Number(password) === post.password) {
        console.log(password)
        await Posts.updateOne({ _id: _postId }, { $set: { title: title, content: content } })
    }
    res.status(200).json({ "message": "게시글을 수정하였습니다." })

})

// 5. 게시글 삭제
router.delete("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    const { password } = req.body
    let post = await Posts.findOne({ _id: _postId })

    if (Number(password) === post.password) {
        console.log(password)
        await Posts.deleteOne({ _id: _postId })
    }
    res.status(200).json({ "message": "게시글을 수정하였습니다." })
})


module.exports = router;