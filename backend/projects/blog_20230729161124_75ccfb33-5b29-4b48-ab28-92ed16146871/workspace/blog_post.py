from dataclasses import dataclass
from datetime import datetime

@dataclass
class BlogPost:
    id: int
    title: str
    content: str
    author: str
    created_at: datetime = datetime.now()
