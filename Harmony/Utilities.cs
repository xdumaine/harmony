using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Harmony
{
    public static class Utilities
    {
        public static string VersionedContent(this UrlHelper url, string relativePath)
        {
            var UrlPath = url.Content(relativePath);
            var FilePath = HttpContext.Current.Server.MapPath(UrlPath);
            var Version = System.IO.File.GetLastWriteTime(FilePath).Ticks;

            // create querystring or append to existing
            var FormatString = UrlPath.Contains("?")
                ? "{0}&v={1}"
                : "{0}?v={1}";

            return string.Format(FormatString, UrlPath, Version);
        }
    }
}