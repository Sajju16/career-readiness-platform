import httpx
import fitz  # PyMuPDF
import re
import logging

logger = logging.getLogger(__name__)

async def extract_text_from_url(pdf_url: str) -> str:
    """
    Downloads the PDF from a signed URL and extracts its text.
    Configured with redirects enabled and a resilient timeout for cloud storage.
    """
    if not pdf_url or not pdf_url.strip():
        raise ValueError("Resume URL is missing or empty")

    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        response = await client.get(pdf_url)
        response.raise_for_status()
        pdf_bytes = response.content

    if not pdf_bytes:
        raise ValueError("Downloaded resume file is empty")

    # Open PDF from bytes
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    except Exception as e:
        logger.error(f"Failed to parse PDF document: {e}")
        raise ValueError("File content is not a valid PDF document")

    if doc.page_count == 0:
        raise ValueError("Resume PDF contains no pages")

    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"

    # Clean text
    text = re.sub(r'\s+', ' ', text)
    cleaned_text = text.strip()

    if not cleaned_text:
        raise ValueError("No readable text could be extracted from resume PDF")

    return cleaned_text
