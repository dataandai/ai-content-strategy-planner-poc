from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import random

app = FastAPI(title="AI Content Strategy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class StrategyRequest(BaseModel):
    niche: str
    goal: str
    platforms: List[str]

class ContentItem(BaseModel):
    id: int
    title: str
    type: str
    platform: str
    pillar: str

class StrategyResponse(BaseModel):
    pillars: List[str]
    content_plan: List[ContentItem]
    executive_summary: str

@app.post("/api/generate", response_model=StrategyResponse)
async def generate_strategy(req: StrategyRequest):
    if not req.niche or not req.goal:
        raise HTTPException(status_code=400, detail="Niche and Goal are required")
    
    pillars = [f"Educational {req.niche}", f"Behind the Scenes", f"Community Building", f"Product Spotlight"]
    
    content_plan = []
    for i in range(1, 7):
        platform = random.choice(req.platforms) if req.platforms else "General"
        content_plan.append({
            "id": i,
            "title": f"How to master {req.niche} in 2024",
            "type": "Short Video" if "TikTok" in req.platforms else "Blog Post",
            "platform": platform,
            "pillar": random.choice(pillars)
        })

    return {
        "pillars": pillars,
        "content_plan": content_plan,
        "executive_summary": f"For a {req.niche} brand focusing on {req.goal}, we recommend a 70/20/10 split between value-based educational content and direct conversion-driven posts."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)