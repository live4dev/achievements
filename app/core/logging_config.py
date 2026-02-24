import logging
import sys


def setup_logging(debug: bool = False) -> None:
    level = logging.DEBUG if debug else logging.INFO
    logging.basicConfig(
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        level=level,
        stream=sys.stdout,
    )
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
