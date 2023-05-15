from fastapi import APIRouter

router = APIRouter(tags=['客製Router1'],
                    prefix="/router1")

@router.get("/users/")
async def read_users():
    return [{"username": "Amy"}, {"username": "John"}]

@router.get("/")
def hello_world():
    return {"Hello": "World"}